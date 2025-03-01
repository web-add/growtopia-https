# Growtopia HTTPS Server

A simple HTTPS server implementation for hosting your Growtopia Private Server (GTPS) with secure connection support.

## Features

- Fixing the failed download problem
- HTTPS/SSL Support
- Request Compression
- Rate Limiting
- Request Logging
- Cross-Origin Resource Sharing (CORS) Support
- Express.js Backend
- EJS Template Engine

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- NPM (usually comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/GTPSHAX/growtopia-https.git
```
2. Navigate to the project directory:
```bash
cd growtopia-https
```
3. Install dependencies:
```bash
npm install
```

## Configuration

The server uses SSL certificates for HTTPS connections. Make sure to:

1. Place your SSL certificates in the certs directory
2. Update the certificate paths in your configuration if needed

## Usage

1. Start the server:
or use the provided batch file:

2. The server will start running on the configured port (default: 443 for HTTPS)

## Project Structure
```plaintext
growtopia-https/
├── certs/               # SSL Certificates
├── middleware/          # Express middleware
├── public/             # Static files
├── routes/             # Route handlers
├── security/           # Security configurations
├── views/              # EJS templates
└── MainApp.js          # Main application file
 ```
 
## Features Details

### Compression

- Uses compression middleware to reduce response size
- Configurable compression level
- Supports compression filtering

### Request Logging

- Logs all incoming requests
- Includes timestamp, IP address, and request details
- CORS support included

### Rate Limiting

- Prevents abuse through rate limiting
- Configurable limits and windows

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU License - see the LICENSE file for details.

## Support

For issues and feature requests, please use the GitHub Issues page.