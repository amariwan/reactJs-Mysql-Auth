var CryptoJS = require("crypto-js");


// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Aland"), 'secret key 123').toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// console.log(decryptedData); // [{id: 1}, {id: 2}]

