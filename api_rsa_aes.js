const rsa = require('./rsa')
const aes = require('./aes')
const fs = require('fs');
var crypto = require('crypto');

/**
 * 암복호화 프로세스
 */
var keyPair = rsa.getKeyPair();
var privateKey = keyPair.exportKey('pkcs1')
var publicKey = keyPair.exportKey('pkcs8-public-pem')

fs.writeFileSync('./indy_prikey.pem', privateKey)
fs.writeFileSync('./indy_pubkey.pem', publicKey)

//암호화 텍스트
const text = "938843d4ea6ef52637811b0371627d78b5c050249ddea1b2c2d28380e7251f62eb4a17cb4e7285742dc2e4ae02b95bec5a451b06a19e0da47584cb67d0209ed8";

//암호화
let pubKey = fs.readFileSync('./app_pubkey', 'utf-8')
let timestamp = + new Date();
let [random_value,key] = aes.makeKey(16)
let encryptAesKey = rsa.encrypt(random_value, pubKey)
let encryptText = aes.encrypt(key, aes.makeIv, text)


//복호화
let priKey = fs.readFileSync('./app_private', 'utf-8')
let decryptAesKey = rsa.decrypt(encryptAesKey, priKey)
let aesKEy = crypto.createHash('sha256').update(decryptAesKey,'utf8').digest();
let decryptText = aes.decrypt(aesKEy, aes.makeIv, encryptText);
timestamp = + new Date()-timestamp;
console.log(timestamp)
console.log(decryptText)

