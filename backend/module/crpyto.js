const crypto = require('crypto');
require('dotenv').config();
/* The key used to encrypt and decrypt the data. */
const viByte = process.env.viByte;
const algorithm = process.env.algorithm;
const secretKey = process.env.secretKey;



const encrypt = (text) => {

  if (text === null && text.length === 0) return null;

  /* Creating a random 16 byte string. */
  const iv = crypto.randomBytes(viByte);

  /* Creating a cipher object. */
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  /* Concatenating the cipher.update(text) and cipher.final() into a single buffer. */
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = (hash) => {

  if (hash === null && hash.length === 0) return null;
  /* Creating a decipher object. */
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  /* Decrypting the content. */
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  /* Returning the decrypted string. */
  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt
};