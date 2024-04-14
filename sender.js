fs = require("fs")
const crypto = require("crypto");

const { generateHMAC, verifyHMAC } = require('./hmac-utils')

// This secret key is shared between both parties. The sender and receiver need to securely exchange this key before any communication takes place, this must be done through a seperate and secure channel.
const secretKey = "E2000-GitDemo";

// Message to check integrity over.
const message = "Hello, world!";

// Function to generate HMAC
function generateHMAC(message, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(message);
    return hmac.digest("hex");
}

// Generate HMAC for the message
const hmac = generateHMAC(message, secretKey);



console.log("Party A: Sending message:", message);
console.log("Party A: Sending HMAC:", hmac);

console.log("Calling receiver...");



// Write the generated HMAC to a file > so we can view it in receiver.js
fs.writeFile("generated-hmac.txt", hmac, (err) => {
    if (err) {
        console.error("Error writing HMAC to file:", err);
    } else {
        console.log("HMAC written to generated-hmac.txt");
    }
});