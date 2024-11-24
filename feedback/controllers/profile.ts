import { Request, Response } from "express";

async function getProfileInfos(request : Request, response: Response) : Promise<void> {
    console.log("fonction getProfileInfos");
    console.log(request.body);
    if (request.body.user_type != null) {
        response.status(200).json({ info: 'Valid token', user_id: request.body.user_id, user_role: request.body.user_type });
    }
    else {
        response.status(400).json({ error: 'Invalid token' });
    }
}

export { getProfileInfos };