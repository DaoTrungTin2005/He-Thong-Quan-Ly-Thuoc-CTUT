package student.ctuet.edu.vn.hethongquanlythuoc.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {

    private final RedisTemplate<String, String> redisTemplate;

    public TokenBlacklistService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void blacklist(String jti, long remainingMs) {
        redisTemplate.opsForValue().set(
                "blacklist:" + jti, 
                "revoked", 
                remainingMs,
                TimeUnit.MILLISECONDS);
    }

    // Kiểm tra token có trong blacklist không
    public boolean isBlacklisted(String jti) {
        return Boolean.TRUE.equals(redisTemplate.hasKey("blacklist:" + jti));
    }
}