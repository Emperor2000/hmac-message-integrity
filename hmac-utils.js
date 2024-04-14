const crypto = require('crypto');

function generateHMAC(message, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(message);
    return hmac.digest("hex");
}

function verifyHMAC(message, receivedHMAC, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(message);
    const generatedHMAC = hmac.digest("hex");
    console.log("Comparing received HMAC against generated HMAC...");
    console.log("received HMAC: " + receivedHMAC + ", generated HMAC: " + generatedHMAC);
    return receivedHMAC === generatedHMAC;
}

module.exports = {
    generateHMAC: generateHMAC,
    verifyHMAC: verifyHMAC
};