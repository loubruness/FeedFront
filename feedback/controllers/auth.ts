import 'dotenv/config';

import { EncryptedRole, FetchLoginResponse } from "../util/Login";
import { Request, Response } from "express";
import { decryptRole, encryptRole } from "./cryptor";

import jwt from 'jsonwebtoken';

const { sign } = jwt;
const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

function createToken(user_id: number, user_role: string): string {
    return sign({ user_id, user_role }, SECRET_KEY, { expiresIn: '1h' });
}

async function fetchUserLogin(email: string, password: string) {
    const response = await fetch(`${EFREI_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    return response.json();
}

async function login(request: Request, response: Response): Promise<void> {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            response.status(400).json({ error: "Email and password are required" });
            return;
        }

        const result : FetchLoginResponse = await fetchUserLogin(email, password);
        const cryptedRole : EncryptedRole = await encryptRole(result.role);

        response.status(200).json({
            info: "User logged in successfully",
            token: createToken(result.id, result.role),
            role: cryptedRole,
        });
    } catch (error: any) {
        console.error(error.message);
        response.status(500).json({ error: error.message || "Internal Server Error" });
    }
}


async function decryptUserRole(request: Request, response: Response): Promise<void> {
    const { encryptedRole, iv } : EncryptedRole = request.query as { encryptedRole: string; iv: string };

    if (!encryptedRole) {
        response.status(400).json({ error: "No cryptedRole provided" });
        return;
    }

    const role = decryptRole(encryptedRole, iv);
    response.status(200).json({ role });
}

export { login, decryptUserRole };
