interface EncryptedRole {
    iv: string;
    encryptedRole: string;
}

interface FetchLoginResponse {
    "id": number;
    "firstname": string;
    "lastname": string;
    "email": string;
    "role": string;
}

export { EncryptedRole, FetchLoginResponse };