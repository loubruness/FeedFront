import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = createHash('sha256').update(process.env.SECRET_KEY_ROLE).digest('base64').slice(0, 32);
const iv = randomBytes(16);

function encryptRole(role) {
    const cipher = createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(role.toString());
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv : iv.toString('hex'),
        encryptId : encrypted.toString('hex')
    };
}

function decryptRole(encryptedRole, iv) {
    const encryptedText = Buffer.from(encryptedRole, 'hex');
    const decipher = createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export {
    encryptRole,
    decryptRole
};