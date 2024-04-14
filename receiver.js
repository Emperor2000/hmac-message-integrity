const fs = require("fs");
const crypto = require("crypto");

const { generateHMAC, verifyHMAC } = require('./hmac-utils');

// This secret key is shared between both parties. The sender and receiver need to securely exchange this key before any communication takes place, this must be done through a separate and secure channel.
const secretKey = "E2000-GitDemo";

// Simulate received message and HMAC
const receivedMessage = "Hello, world!"; // Received message from Party A
let receivedHMAC;

fs.readFile("generated-hmac.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading HMAC from file:", err);
        return;
    }
    receivedHMAC = data.trim();

    // Verify the integrity of the received message after reading the HMAC from the file
    const isIntegrityVerified = verifyHMAC(receivedMessage, receivedHMAC, secretKey);

    if (isIntegrityVerified) {
        console.log("Message integrity verified. Received and generated hashes match.");
    } else {
        console.log("Message integrity failed. The message may have been tampered with.");
    }
});