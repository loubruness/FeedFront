import 'dotenv/config';

import { Request, Response } from "express";

const EFREI_API_URL = process.env.EFREI_API_URL || "http://localhost:8000";

async function fetchUserInfo(user_id: string) {
    const response = await fetch(`${EFREI_API_URL}/user/${user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-api-key": "apikey"},
        redirect: "follow" as RequestRedirect
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    return response.json();
}

async function getProfileInfos(request : Request, response: Response) : Promise<void> {
    console.log("her");
    console.log(request.body);
    const user_id = request.body.user_id as string;
    const user_role = request.body.user_role as string;
    
    if (user_id != null && user_role != null) {
        const result = await fetchUserInfo(user_id);
        if(user_role === "student"){
            result.firstname='';
            result.lastname='';
        }
        response.status(200).json({ info: 'Valid token', result : result});
    }
    else {
        response.status(400).json({ error: 'Invalid token' });
    }
}

export { getProfileInfos };