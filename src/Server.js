const path = require('path');
const app = require(path.join(__dirname, 'MainApp.js'));
const https = require('https');
const fs = require('fs');
const tls = require('tls');

const sniDefaultCert = fs.readFileSync(path.join(__dirname, '..', 'certs', 'osm.growplus.asia', 'osm.growplus.asia-crt.pem'));
const sniDefaultKey = fs.readFileSync(path.join(__dirname, '..', 'certs', 'osm.growplus.asia', 'osm.growplus.asia-key.pem'));
const sniDefaultChain = fs.readFileSync(path.join(__dirname, '..', 'certs', 'osm.growplus.asia', 'osm.growplus.asia-chain.pem'));

const sniCallback = (serverName, callback) => {
    console.log(`Requested SNI for: ${serverName}`);
    let cert = sniDefaultCert;
    let key = sniDefaultKey;
    let ca = sniDefaultChain;

    if (serverName === 'www.growtopia1.com' || serverName === 'www.growtopia2.com') {
        cert = fs.readFileSync(path.join(__dirname, '..', 'certs', 'growtopia1.com', 'gt-crt.pem'));
        key = fs.readFileSync(path.join(__dirname, '..', 'certs', 'growtopia1.com', 'gt-key.pem'));
        ca = null;
        passphrase = null;
    }

    callback(null, tls.createSecureContext({ cert, key, ca }));
}

const serverOptions = {
    cert: sniDefaultCert,
    key: sniDefaultKey,
    ca: sniDefaultChain,
    SNICallback: sniCallback,
    keepAliveTimeout: 60000, // 60 seconds
    headersTimeout: 65000, // 65 seconds
};

// starting server with port 80
app.listen(80, () => {
    console.log('Server started at http://localhost:80');
}).on('request', (req, res) => {
	try {
        const currentTime = new Date().toISOString();
        const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || req.ip;
        console.log(
            `[HTTP][${req.get('host')}][${clientIP}] ${req.method} -> ${req.originalUrl} - ${currentTime}`,
        );
    } catch (error) {
        console.error('Error logging request:', error);
    }
}).on('tlsClientError', (err, socket) => {
    console.error('Error handshake TLS:', err.message);
    socket.destroy();
}).on('clientError', (err, socket) => {
    console.error('Client error:', err.message);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// starting secure server with port 443
https.createServer(serverOptions, app).listen(443, () => {
    console.log('Secure server started at https://localhost:443');
}).on('request', (req, res) => {
	try {
        const currentTime = new Date().toISOString();
        const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || req.ip;
        console.log(
            `[HTTPS][${req.get('host')}][${clientIP}] ${req.method} -> ${req.originalUrl} - ${currentTime}`,
        );
    } catch (error) {
        console.error('Error logging request:', error);
    }
}).on('tlsClientError', (err, socket) => {
    console.error('Error handshake TLS:', err.message);
    socket.destroy();
}).on('clientError', (err, socket) => {
    console.error('Client error:', err.message);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});;