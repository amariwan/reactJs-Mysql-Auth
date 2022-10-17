const { v4: uuidv4 } = require('uuid');

'use strict';

var codebook = [];
codebook[0] = 'a';
codebook[1] = 'b';
codebook[2] = 'c';
codebook[3] = 'd';
codebook[4] = 'e';
codebook[5] = 'f';
codebook[6] = 'g';
codebook[7] = 'h';
codebook[8] = 'i';
codebook[9] = 'j';
codebook[10] = 'k';
codebook[11] = 'l';
codebook[12] = 'm';
codebook[13] = 'n';
codebook[14] = 'o';
codebook[15] = 'p';
codebook[16] = 'q';
codebook[17] = 'r';
codebook[18] = 's';
codebook[19] = 't';
codebook[20] = 'u';
codebook[21] = 'v';
codebook[22] = 'w';
codebook[23] = 'x';
codebook[24] = 'y';
codebook[25] = 'z';
codebook[26] = 'A';
codebook[27] = 'B';
codebook[28] = 'C';
codebook[29] = 'D';
codebook[30] = 'E';
codebook[31] = 'F';
codebook[32] = 'G';
codebook[33] = 'H';
codebook[34] = 'I';
codebook[35] = 'J';
codebook[36] = 'K';
codebook[37] = 'L';
codebook[38] = 'M';
codebook[39] = 'N';
codebook[40] = 'O';
codebook[41] = 'P';
codebook[42] = 'Q';
codebook[43] = 'R';
codebook[44] = 'S';
codebook[45] = 'T';
codebook[46] = 'U';
codebook[47] = 'V';
codebook[48] = 'W';
codebook[49] = 'X';
codebook[50] = 'Y';
codebook[51] = 'Z';
codebook[52] = '0';
codebook[53] = '1';
codebook[54] = '2';
codebook[55] = '3';
codebook[56] = '4';
codebook[57] = '5';
codebook[58] = '6';
codebook[59] = '7';
codebook[60] = '8';
codebook[61] = '9';
codebook[62] = '`';
codebook[63] = '~';
codebook[64] = '!';
codebook[65] = '@';
codebook[66] = '#';
codebook[67] = '$';
codebook[68] = '%';
codebook[69] = '^';
codebook[70] = '&';
codebook[71] = '*';
codebook[72] = '(';
codebook[73] = ')';
codebook[74] = '-';
codebook[75] = '=';
codebook[76] = '_';
codebook[77] = '+';
codebook[78] = '[';
codebook[79] = ']';
codebook[80] = '{';
codebook[81] = '}';
codebook[82] = '|';
codebook[83] = '\\';
codebook[84] = ';';
codebook[85] = ':';
codebook[86] = "'";
codebook[87] = '"';
codebook[88] = ',';
codebook[89] = '.';
codebook[90] = '<';
codebook[91] = '>';
codebook[92] = '/';
codebook[93] = '?';
codebook[94] = ' ';
codebook[95] = '\n';
codebook[96] = '\r';
codebook[97] = '\t';
codebook[98] = '–';
codebook[99] = '—';

function encode(text) {
	var code = [];
	for (var i = 0; i < text.length; i++) {
		if (codebook.indexOf(text[i]) !== -1) {
			code[i] = codebook.indexOf(text[i]).toString();
			if (code[i].length === 1) {
				code[i] = '0' + code[i];
			}
		}
	}
	return code.join('');
}

function decode(code) {
	var codeLength = code.length / 2;
	code = code.match(/.{1,2}/g);
	var text = [];
	for (var i = 0; i < codeLength; i++) {
		code[i] *= 1;
		text[i] = codebook[code[i]];
	}
	return text.join('');
}

function otp(message, key, mode, keyRepetition) {
	var codeMessage, error;
	if (message === '' || key === '') {
		error = 'Error: The message and key must not be be empty.';
		console.log(error);
		return error;
	}
	var codeKey = encode(key);
	if (mode == 'encrypt') {
		codeMessage = encode(message);
	} else if (mode == 'decrypt') {
		if (!isNaN(message)) {
			codeMessage = message;
		} else {
			error = 'Error: When decrypting, the message must only contain numbers.';
			console.log(error);
			return error;
		}
	}
	if (codeKey.length < codeMessage.length) {
		if (keyRepetition === true) {
			if (mode == 'encrypt') {
				console.log(
					"WARNING: The key is shorter than the message.\nThe keyRepetition flag has been set, so OneTimePad.js will now repeat the key until it's long enough, but this is not secure. Repetition of the key will cause statistical patterns in the ciphertext that will make it easier for a third party to decrypt it without the key. You really should use a key at that's least the same length as the message.",
				);
			}
			while (codeKey.length < codeMessage.length) {
				codeKey += codeKey;
			}
		} else {
			error = 'Error: The key is shorter than the message.';
			console.log('[One Time Pad] ' + error);
			return error;
		}
	}
	codeMessage = codeMessage.split('');
	codeKey = codeKey.split('');
	var codeOutput = [];
	for (var i = 0; i < codeMessage.length; i++) {
		codeMessage[i] *= 1;
		codeKey[i] *= 1;
		if (mode == 'encrypt') {
			codeOutput[i] = codeMessage[i] + codeKey[i];
			if (codeOutput[i] > 9) {
				codeOutput[i] -= 10;
			}
		}
		if (mode == 'decrypt') {
			codeOutput[i] = codeMessage[i] - codeKey[i];
			if (codeOutput[i] < 0) {
				codeOutput[i] += 10;
			}
		}
	}
	var outputString = codeOutput.join('');
	if (mode == 'decrypt') {
		return decode(outputString);
	} else {
		return outputString;
	}
}


const iv = uuidv4();
const encrypt = (plainText) => {
  if (plainText === null && plainText.length === 0) return null;
  
	const cipher = otp(plainText, iv, 'encrypt');
  
	return {
    iv: iv,
		content: cipher,
	};
};

const decrypt = (cipher) => {
  if ((cipher === null && cipher.length === 0) || typeof cipher !== 'object') return cipher;
  
  var text = otp(cipher.content, cipher.iv, 'decrypt');
  
	return text;
};

module.exports = {
	encrypt,
	decrypt,
  otp
};
