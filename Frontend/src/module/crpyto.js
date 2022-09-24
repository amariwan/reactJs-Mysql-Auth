const crypto = require('crypto');
/* The key used to encrypt and decrypt the data. */
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = (text) => {
// do not use a global iv for production, 
// generate a new one for each encryption
  const iv = crypto.randomBytes(16);

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