// main function
const RequestLogger = async (req, res, next) => {
    // Setting the headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );

    const currentTime = new Date().toISOString();
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || req.ip;
    console.log(
        `[${req.get('host')}] ${clientIP} -> ${req.method} ${req.originalUrl} - ${currentTime}`,
    );

    // passing the request to the next handler
    next();
};

// exporting the middleware
module.exports = RequestLogger;