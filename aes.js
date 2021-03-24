var crypto = require('crypto');

var AESCrypt = {};

AESCrypt.encrypt = function(cryptKey, crpytIv, plainData) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptKey, crpytIv),
        encrypted = encipher.update(plainData, 'utf8', 'binary');
    encrypted += encipher.final('binary');

    return new Buffer.from(encrypted, 'binary').toString('base64');
};

AESCrypt.decrypt = function(cryptKey, cryptIv, encrypted) {
    encrypted = new Buffer.from(encrypted, 'base64').toString('binary');

    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptKey, cryptIv),
        decrypted = decipher.update(encrypted, 'binary', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
};

AESCrypt.makeKey = function (length) {
    var randomValue           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       randomValue += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let key = crypto.createHash('sha256').update(randomValue,'utf8').digest()
    return [randomValue,key];
}

// AESCrypt.makeIv = crypto.randomBytes(16);
AESCrypt.makeIv = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

// Change this private symmetric key salt
AESCrypt.KEY = crypto.createHash('sha256').update('text','utf8').digest();

module.exports = AESCrypt;