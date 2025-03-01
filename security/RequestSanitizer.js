const sanitize = require('sanitize');

const requestSanitizer = (req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = sanitize(req.body[key]).trim();
            }
        }
    }
    next();
};

module.exports = requestSanitizer;