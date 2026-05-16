package student.ctuet.edu.vn.hethongquanlythuoc.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-expiration}")
    private long accessExpiration;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // =================== TẠO TOKEN ===================

    public String generateAccessToken(Authentication authentication, long userId) {
        return buildToken(
                authentication.getName(),
                getRole(authentication),
                userId,
                accessExpiration,
                "access");
    }

    public String generateRefreshToken(Authentication authentication, long userId) {
        return buildToken(
                authentication.getName(),
                getRole(authentication),
                userId,
                refreshExpiration,
                "refresh");
    }

    private String buildToken(String username, String role,
            long userId, long expiration, String type) {
        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .subject(username)
                .claim("role", role)
                .claim("userId", userId)
                .claim("type", type)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    // =================== ĐỌC TOKEN ===================

    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return parseClaims(token).get("role", String.class);
    }

    public long extractUserId(String token) {
        return parseClaims(token).get("userId", Long.class);
    }

    public String extractJti(String token) {
        return parseClaims(token).getId();
    }

    public long getRemainingExpiration(String token) {
        return parseClaims(token).getExpiration().getTime()
                - System.currentTimeMillis();
    }

    // =================== KIỂM TRA ===================

    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false; 
        }
    }

    public boolean isAccessToken(String token) {
        return "access".equals(parseClaims(token).get("type", String.class));
    }

    public boolean isRefreshToken(String token) {
        return "refresh".equals(parseClaims(token).get("type", String.class));
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private String getRole(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("");
    }
}