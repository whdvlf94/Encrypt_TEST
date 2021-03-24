var NodeRSA = require('node-rsa');

var key = new NodeRSA( { b: 512 } );

// usage in code: (nodeRsa is a variable of this)
// nodeRsa.encrypt(plainData) or nodeRsa.encrypt(plainData, rsaPublicKey)
function encrypt() {
    switch (arguments.length) {
        case 1:
            return key.encrypt(arguments[0], 'base64');

        case 2:
            tempKey = new NodeRSA();
            tempKey.importKey(arguments[1], 'pkcs8-public-pem');

            return tempKey.encrypt(arguments[0], 'base64');

        default:
            return null;
    }
};

function decrypt(cipherText,privateKey) {
    tempKey = new NodeRSA();
    tempKey.importKey(privateKey, 'pkcs1');
    return tempKey.decrypt(cipherText, 'buffer');
};

function getKeyPair() {
    return key;
};

function getPrivateKey() {
    return key.exportKey('pkcs1');
};

function getPublicKey() {
    return key.exportKey('pkcs8-public-pem');
};

module.exports = NodeRSA;
module.exports = {encrypt, decrypt, getKeyPair,getPrivateKey, getPublicKey};