import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

// Validate and derive the secret key
const SECRET_KEY_ROLE = process.env.SECRET_KEY_ROLE;
if (!SECRET_KEY_ROLE) {
    throw new Error("SECRET_KEY_ROLE is not defined in environment variables.");
}

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = createHash('sha256').update(SECRET_KEY_ROLE).digest('base64').slice(0, 32);

/**
 * Encrypt a role using AES-256-CBC.
 * @param role - The role to encrypt.
 * @param iv - Optional initialization vector (IV); generated if not provided.
 * @returns An object containing the IV and the encrypted role.
 */
function encryptRole(role: string, iv: Buffer = randomBytes(16)): { iv: string; encryptedRole: string } {
    try {
        const cipher = createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
        let encrypted = cipher.update(role, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: iv.toString('hex'),
            encryptedRole: encrypted.toString('hex'),
        };
    } catch (error) {
        throw new Error(`Error encrypting role: ${error.message}`);
    }
}

/**
 * Decrypt an encrypted role using AES-256-CBC.
 * @param encryptedRole - The encrypted role as a hex string.
 * @param iv - The initialization vector (IV) as a hex string.
 * @returns The decrypted role as a string.
 */
function decryptRole(encryptedRole: string, iv: string): string {
    try {
        const encryptedText = Buffer.from(encryptedRole, 'hex');
        const decipher = createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY_ROLE), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        throw new Error(`Error decrypting role: ${error.message}`);
    }
}

export { encryptRole, decryptRole };
