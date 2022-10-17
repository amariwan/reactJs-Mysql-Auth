const CryptoJS = require('crypto-js');
const Sha256 = CryptoJS.SHA256;
const Hex = CryptoJS.enc.Hex;
const Utf8 = CryptoJS.enc.Utf8;
const Base64 = CryptoJS.enc.Base64;
const AES = CryptoJS.AES;
/* The key used to encrypt and decrypt the data. */
const secret_key = 'thisIsK3y';
const secret_iv = 'tHis1s1v';

const key = Sha256(secret_key).toString(Hex).substr(0, 32); // Use the first 32 bytes (see 2.)
const iv = Sha256(secret_iv).toString(Hex).substr(0, 16);

const encrypt = (plainText) => {
	if (plainText === null && plainText.length === 0) return null;

	// do not use a global iv for production,
	// generate a new one for each encryption
	// const iv = crypto.randomBytes(64).toString('hex');

	/* Creating a cipher object. */
	const ciphertext = AES.encrypt(JSON.stringify(plainText), 'secret key 123').toString();
	return ciphertext
	// {
	// 	iv: Utf8.parse(iv),
	// 	content:output2ndB64 ,
	// };
};

const decrypt = (cipher) => {
	if ((cipher === null && cipher.length === 0) || typeof cipher !== 'object') return cipher;

	/* Decrypting the content. */
	// Decryption
	var bytes  = CryptoJS.AES.decrypt(cipher, 'secret key 123');
	var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	console.log(decryptedData);
	/* Returning the decrypted string. */
	return  decryptedData ;
};

module.exports = {
	encrypt,
	decrypt,
};
