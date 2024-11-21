import { createResponse } from "../database/queries/responses";

export async function createResponseAction(request, response) {
    response.status(201).json(await createResponse(request.body));
}