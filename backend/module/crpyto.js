const crypto = require('crypto');
require('dotenv').config();
const viByte = process.env.viByte;

const algorithm = process.env.algorithm;
const secretKey = process.env.secretKey;



const encrypt = (text) => {

  /* Creating a random 16 byte string. */
  const iv = crypto.randomBytes(viByte); 

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = (hash) => {

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt
};