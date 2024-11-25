import 'dotenv/config';

import { EncryptedRole, FetchLoginResponse } from "../util/Login";
import { Request, Response } from "express";
import { decryptRole, encryptRole } from "./cryptor";

import jwt from 'jsonwebtoken';

const { sign } = jwt;
const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";
const SECRET_KEY = process.env.SECRET_KEY;
const EFREI_API_KEY = process.env.EFREI_API_KEY || "";

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

if (!EFREI_API_KEY) {
    throw new Error("EFREI_API_KEY is not defined in the environment variables");
}

/**
 * Generates a JSON Web Token for the user.
 * @param userId - The user's ID.
 * @param userRole - The user's role.
 * @returns A JWT string.
 */
function createToken(userId: number, userRole: string): string {
    return sign({ userId, userRole }, SECRET_KEY, { expiresIn: '1h' });
}

/**
 * Authenticates a user by making a POST request to the EFREI API.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves to the login response data.
 */
async function fetchUserLogin(email: string, password: string): Promise<FetchLoginResponse> {
    const response = await fetch(`${EFREI_API_URL}/user/login`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": EFREI_API_KEY 
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    return response.json();
}

/**
 * Handles user login and returns a JWT and encrypted role.
 * @param request - The HTTP request object containing email and password in the body.
 * @param response - The HTTP response object.
 */
async function login(request: Request, response: Response): Promise<void> {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            response.status(400).json({ error: "Email and password are required" });
            return;
        }

        const result: FetchLoginResponse = await fetchUserLogin(email, password);
        const encryptedRole: EncryptedRole = await encryptRole(result.role);

        response.status(200).json({
            info: "User logged in successfully",
            token: createToken(result.id, result.role),
            role: encryptedRole,
        });
    } catch (error: any) {
        console.error('Login error:', error.message);
        response.status(500).json({ error: error.message || "Internal Server Error" });
    }
}

/**
 * Decrypts an encrypted user role and returns it.
 * @param request - The HTTP request object containing encryptedRole and iv in the query.
 * @param response - The HTTP response object.
 */
async function decryptUserRole(request: Request, response: Response): Promise<void> {
    try {
        const { encryptedRole, iv }: EncryptedRole = request.query as { encryptedRole: string; iv: string };

        if (!encryptedRole || !iv) {
            response.status(400).json({ error: "Both encryptedRole and iv are required" });
            return;
        }

        const role = decryptRole(encryptedRole, iv);
        response.status(200).json({ role });
    } catch (error: any) {
        console.error('Decryption error:', error.message);
        response.status(500).json({ error: "Failed to decrypt role" });
    }
}

export { login, decryptUserRole };
