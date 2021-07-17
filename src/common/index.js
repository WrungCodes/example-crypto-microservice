const {v4:uuid} = require('uuid');

const crypto = require("crypto");

module.exports = {
    generateUuid: generateUuid,
    generateApiKey: generateApiKey,
    encryptData: encrypt,
    decryptData: decrypt,
    cleanObject: cleanObject,
    makeRandomString: makeRandomString
}

function cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

function generateUuid()
{
    return uuid();
}

function generateApiKey()
{
    return crypto.randomBytes(32).toString("hex");
}

function encrypt(key, algorithm, text) {
    key = crypto.createHash('sha256').update(key).digest();
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(key, algorithm, text) {
    key = crypto.createHash('sha256').update(key).digest();
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function makeRandomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}