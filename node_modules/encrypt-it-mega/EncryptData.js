const CryptoJS = require("crypto-js");

function encrypt(data, secretKey) {
    if (typeof data === 'object' || typeof data === 'number' || typeof data === 'boolean') {
        const jsonString = typeof data === 'object' ? JSON.stringify(data) : data.toString();
        const iv = CryptoJS.lib.WordArray.random(16);
        const ciphertext = CryptoJS.AES.encrypt(jsonString, secretKey, { iv: iv });
        return {
            type: typeof data,
            iv: iv.toString(),
            ciphertext: ciphertext.toString()
        };
    } else if (typeof data === 'string') {
        const iv = CryptoJS.lib.WordArray.random(16);
        const ciphertext = CryptoJS.AES.encrypt(data, secretKey, { iv: iv });
        return {
            type: typeof data,
            iv: iv.toString(),
            ciphertext: ciphertext.toString()
        };
    }
}

module.exports = encrypt
