const rateLimit = require('express-rate-limit');

const RateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 500, // Batas 500 request per IP
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    // Tambahan konfigurasi
    handler: (req, res) => {
        res.status(429).send('Too many requests, please try again later.');
    },
    keyGenerator: (req) => {
        return req.ip; // Gunakan IP sebagai identifier
    },
    skip: (req) => {
        // Skip rate limiting untuk rute tertentu jika diperlukan
        return false;
    }
});

module.exports = RateLimiter;