const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const Sha256 = CryptoJS.SHA256;
const Hex = CryptoJS.enc.Hex;
const Utf8 = CryptoJS.enc.Utf8;
const Base64 = CryptoJS.enc.Base64;
const AES = CryptoJS.AES;
/* The key used to encrypt and decrypt the data. */
const viByte = process.env.viByte;
const algorithm = process.env.algorithm;
const secret_key  = process.env.secretKey;
const secret_iv = uuidv4();


/* The key used to encrypt and decrypt the data. */

const key = Sha256(secret_key).toString(Hex).substr(0, 32); // Use the first 32 bytes (see 2.)
const iv = Sha256(secret_iv).toString(Hex).substr(0, 16);

const encrypt = (plainText) => {
	if (plainText === null && plainText.length === 0) return null;

	// do not use a global iv for production,
	// generate a new one for each encryption
	// const iv = crypto.randomBytes(64).toString('hex');

	/* Creating a cipher object. */
	const output = AES.encrypt(plainText, Utf8.parse(key), {
		iv: Utf8.parse(iv),
	}).toString();
	const output2ndB64 = Utf8.parse(output).toString(Base64); // Second Base64 encoding (see 1.)
	return {
		iv: iv,
		content:output2ndB64 ,
	};
};

const decrypt = (cipher) => {
	if ((cipher === null && cipher.length === 0) || typeof cipher !== 'object') return cipher;

	/* Decrypting the content. */
	// Decryption
	const decrypted = AES.decrypt(cipher.content, Utf8.parse(key), {
		iv: Utf8.parse(cipher.iv),
	}).toString(Utf8);
	/* Returning the decrypted string. */
	console.log(decrypted);
	return decrypted;
};

module.exports = {
	encrypt,
	decrypt,
};
