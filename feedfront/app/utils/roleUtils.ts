import { createDecipheriv, createHash } from 'crypto';

// logic to determine user role (e.g., from localStorage, API, or context)
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // return user.role || "student";
    /**
 * Decrypt an encrypted role using AES-256-CBC.
 * @param encryptedRole - The encrypted role as a hex string.
 * @param iv - The initialization vector (IV) as a hex string.
 * @returns The decrypted role as a string.
 */
export const getUserRole = (encryptedRole: string, iv : string): "admin" | "student" | "teacher" => {
  const SECRET_KEY_ROLE = "4efbbc2e2c492e5c05854478bed636f01fdb02b59ff9fbf4b590cf29f89f8e03";
  const SECRET_KEY = createHash('sha256').update(SECRET_KEY_ROLE).digest('base64').slice(0, 32);
  const ALGORITHM = 'aes-256-cbc';
  try {
    if (!encryptedRole || !iv) {
      throw new Error("Role or IV not found in localStorage.");
    }
      const encryptedText = Buffer.from(encryptedRole, 'hex');
      if(!SECRET_KEY) {
          throw new Error("SECRET_KEY_ROLE is not defined in environment variables.");
      }
      const decipher = createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), Buffer.from(iv, 'hex'));
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      localStorage.setItem("role",decrypted.toString('utf8'));
      console.log(decrypted.toString('utf8') as "admin" | "student" | "teacher");
      return decrypted.toString('utf8') as "admin" | "student" | "teacher";
  } catch (error: unknown) {
      throw new Error(`Error decrypting role: ${(error as Error).message}`);
  }
};
  