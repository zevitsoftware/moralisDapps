console.log('\x1b[0m', 'Restart Put Presale Server');
require('dotenv').config();
const fs = require('fs');
const privateKey = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');
const options = {
    key: privateKey,
    cert: certificate
};
const server = require('http').createServer(/*options,*/ app).listen(4040, {origins: '*:*'});
const Moralis = require('moralis');
