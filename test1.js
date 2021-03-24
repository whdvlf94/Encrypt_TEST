var NodeRSA = require('node-rsa');
const fs = require('fs'); // file exist 여부 확인용

var keyPair = new NodeRSA({b:512});
var privateKey = keyPair.privateKey
var publicKey = keyPair.publicKey
console.log(privateKey,publicKey)
fs.writeFileSync('./indy_prikeysss.pem', privateKey)
fs.writeFileSync('./indy_pubkeysss.pem', publicKey)
return publicKey;