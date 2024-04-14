# Verifying message integrity and authenticity between two parties using HMAC (Hash-based Message Authentication Code)
## Introduction
This project demonstrates the use of HMAC (Hash-based Message Authentication Code) for ensuring the integrity and authenticity of messages exchanged between trusted parties. HMAC is a cryptographic technique that uses a shared secret key to generate a hash of the message, which can be used to verify that the message has not been tampered with during transmission.

In this example, we have two parties: **Alice** (Party A, the sender) and **Bob** (Party B, the receiver), who want to communicate securely. They use HMAC to ensure that the messages they exchange have not been tampered with by an unauthorized party.

## Process

### 1. Shared Secret Key Generation

Before any communication takes place, Alice and Bob securely exchange a shared secret key. This key must be kept confidential and is used to generate and verify HMACs. When the key is no longer confidential between Alice and Bob (or leaked) we can no longer use this technique to determine message integrity. For this reason, we must assume that Alice and Bob has successfully exchanged a secret key through a seperate, secure (trusted) channel.
When using this technique in production best practises include:
1. Utilising a secure and seperate channel for exchanging the secret, sending a secret key via a potentially insecure channel negates any trust/validity HMAC can establish.
2. Storing the secret key in an appropriate manner, such as a key-vault.
3. Rotating the secret periodically.

### 2. Message Transmission

1. **Alice** generates a message and calculates its HMAC using the shared secret key.
2. **Bob** receives the message and its corresponding HMAC.
3. **Bob** verifies the integrity of the message by recalculating its HMAC using the shared secret key and comparing it with the received HMAC.

### 3. Importance of HMAC

Using HMAC for message validation is crucial for several reasons:

- **Data Integrity**: HMAC ensures that the message has not been altered during transmission. Any unauthorized modification to the message will result in a different HMAC, alerting the receiver to tampering attempts.
  
- **Authentication**: Since both parties share the secret key, HMAC also provides authentication. Only parties with access to the key can generate valid HMACs, thereby verifying the authenticity of the sender.
  
- **Protection Against Attacks**: By verifying the integrity of the message, HMAC protects against various attacks, including data tampering and replay attacks.

## Scenarios

### Scenario 1: Successful Communication (Alice -> Bob)
```
   +-----------+                            +-----------+
   |   Alice   |                            |    Bob    |
   +-----------+                            +-----------+
       |                                           |
       |            Message + HMAC                 |
       |------------------------------------------>|
       |                                           |
       |                                           |
       |                                           |
       |                                           |
       |                  Integrity Verified       |
       |<------------------------------------------|
       |                                           |
```
In this scenario Alice sends a message to Bob along with a HMAC Alice generated over her message. Bob, in turn, verifies the integrity of the message by generating his own HMAC based on the message received by Alice. Bob sees that his HMAC matches the HMAC Alice sent to Bob. Thus we can conclude that the message is not tampered with.


### Scenario 2: Tampering attempt by Eve (Alice -> Eve -> Bob)
```
   +-----------+                            +-----------+                            +-----------+
   |   Alice   |                            |    Eve    |                            |    Bob    |
   +-----------+                            +-----------+                            +-----------+
       |                                           |                                           |
       |            Message + HMAC                 |                                           |
       |------------------------------------------>|                                           |
       |                                           |                                           |
       |                                           |                                           |
       |                                           |             Modified Message + HMAC       |
       |                                           |------------------------------------------>|
       |                                           |                                           |
       |                                           |                                           |
       |                                           |                                           |
       |                                           |                  Verify HMAC Failure      |
       |                                           |<------------------------------------------|
       |                                           |                                           |
```
In this scenario Alice again sends a message to Bob along with a HMAC Alice generated over her message. However, when Bob verifies the integrity of the message, Bob finds that the HMAC he generated does not match the HMAC Alice sent. This can mean one of two things:
1. The secret key no longer matches for Alice and Bob.
2. The message has been altered since Alice generated her HMAC.

In this scenario, Bob can conclude the message is tampered with.


## Conclusion

Implementing HMAC for message validation is a crucial aspect of ensuring the integrity and authenticity of communication in projects that involve transmitting data between parties. By incorporating HMAC into your project's communication protocol, you can significantly enhance the security of data exchange and mitigate some risks associated with data tampering and unauthorized access.

**Securely implementing HMAC relies on the following**:

Key Management: Ensure secure generation and exchange of secret keys between communicating parties. Keys should be kept confidential and protected from unauthorized access.

HMAC Generation: Use cryptographic libraries to generate HMACs for outgoing messages. Include the HMAC alongside the message to provide integrity verification to the receiver.

HMAC Verification: Upon receiving a message and its corresponding HMAC, the recipient should recalculate the HMAC using the shared secret key and compare it with the received HMAC. If the HMACs match, the message's integrity is verified.

Error Handling: Implement robust error handling mechanisms to address scenarios where HMAC verification fails. This may include logging, alerting, or rejecting messages with invalid HMACs.

Documentation and Training: Document the HMAC implementation process, including key generation, message format, and HMAC verification steps. Provide training to relevant stakeholders on proper usage and security best practices.

Regular Audits and Updates: Periodically audit and update your HMAC implementation to ensure it remains aligned with the latest security standards and best practices. This may involve reviewing key management procedures, cryptographic algorithms, and error handling mechanisms.