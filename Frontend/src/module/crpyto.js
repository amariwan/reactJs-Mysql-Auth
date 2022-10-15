const CryptoJS = require('crypto-js/sha256');
const { v4: uuidv4 } = require('uuid');

/* The key used to encrypt and decrypt the data. */
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = (plainText) => {
	if (plainText === null && plainText.length === 0) return null;

	// do not use a global iv for production,
	// generate a new one for each encryption
	// const iv = crypto.randomBytes(64).toString('hex');
	const iv = uuidv4(); //instead of crypto.randomBytes(64).toString('hex')

	/* Creating a cipher object. */
	const encrypted = CryptoJS.AES.encrypt(plainText, secretKey, {
		keySize: 16,
		iv: iv,
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});
	return {
		iv: iv.toString('hex'),
		content: encrypted,
	};
};

const decrypt = (cipher) => {
	if ((cipher === null && cipher.length === 0) || typeof cipher !== 'object') return cipher;

	/* Decrypting the content. */
	const plainText = CryptoJS.AES.decrypt(cipher.content, secretKey, {
		keySize: 16,
		iv: cipher.iv,
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});

	/* Returning the decrypted string. */
	return plainText.toString(CryptoJS.enc.Utf8);
};

module.exports = {
	encrypt,
	decrypt,
};
