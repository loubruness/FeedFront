import { createResponse } from "../database/queries/responses";

export async function createResponseAction(request, response) {
    try {
        response.status(201).json(await createResponse(request.body));
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}