import 'dotenv/config';

import { Request, Response } from "express";

const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";
const EFREI_API_KEY = process.env.EFREI_API_KEY;

if (!EFREI_API_KEY) {
    throw new Error("EFREI_API_KEY is not defined in the environment variables");
}

/**
 * User information fetched from EFREI API.
 */
interface UserInfo {
    firstname: string;
    lastname: string;
    email: string;
}

/**
 * Fetches user information from the EFREI API.
 *
 * @param {string} userId - The ID of the user to fetch information for.
 * @returns {Promise<UserInfo>} A promise that resolves to the user information in JSON format.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function fetchUserInfo(userId: string): Promise<UserInfo> {
    const response = await fetch(`${EFREI_API_URL}/user/${userId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": EFREI_API_KEY 
        },
        redirect: "follow" as RequestRedirect,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user with status ${response.status}`);
    }

    try {
        const data: UserInfo = await response.json();
        return data;
    } catch (error) {
        throw new Error("Invalid JSON response from the EFREI API");
    }
}

/**
 * Handles the request to get profile information.
 * 
 * @param request - The HTTP request object containing the userId and userRole in the body.
 * @param response - The HTTP response object used to send back the profile information or an error message.
 * @returns A promise that resolves to void.
 */
async function getProfileInfos(request: Request, response: Response): Promise<void> {
    const { user_id: userId, user_role: userRole } = request.body;

    if (!userId || !userRole) {
        response.status(400).json({ error: "Missing user_id or user_role in request body" });
        return;
    }

    try {
        const result = await fetchUserInfo(userId);

        // Avoid mutation of the original result object
        const sanitizedResult = { ...result };
        if (userRole === "student") {
            sanitizedResult.firstname = "";
            sanitizedResult.lastname = "";
        }

        response.status(200).json({ 
            info: "Valid token", 
            result: sanitizedResult 
        });
    } catch (error: any) {
        console.error(`Error fetching user info for userId=${userId}, userRole=${userRole}:`, error.message);
        
        // More descriptive error response
        if (error.message.includes("Failed to fetch")) {
            response.status(502).json({ error: "Unable to fetch user information from EFREI API" });
        } else {
            response.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export { getProfileInfos };
