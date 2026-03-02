package student.ctuet.edu.vn.hethongquanlythuoc.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import student.ctuet.edu.vn.hethongquanlythuoc.service.TokenBlacklistService;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final TokenBlacklistService tokenBlacklistService;

    public JwtFilter(JwtUtils jwtUtils, TokenBlacklistService tokenBlacklistService) {
        this.jwtUtils = jwtUtils;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        if (!jwtUtils.isTokenValid(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (!jwtUtils.isAccessToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jti = jwtUtils.extractJti(token);
        if (tokenBlacklistService.isBlacklisted(jti)) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = jwtUtils.extractUsername(token);
        String role = jwtUtils.extractRole(token);

        var authentication = new UsernamePasswordAuthenticationToken(
                username,
                null,
                List.of(new SimpleGrantedAuthority(role)));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}