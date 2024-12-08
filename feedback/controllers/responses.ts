import { Response, createResponse } from "../database/queries/responses";
import { markTokenAsUsed, verifyTokenUsed } from "../database/queries/email";

export async function createResponseAction(request, response) {
    try {
        console.log(request.body);
        const valid = await verifyTokenUsed(request.body.token);
        console.log(valid);
        if (valid) {
            response.status(400).json({ error: "Token is invalid or has already been used" });
            return;
        }else{
            console.log("Token is valid");
            markTokenAsUsed(request.body.token);
            const responseData : Response = { id_form: request.body.id_form, grades: request.body.grades };
            response.status(201).json(await createResponse(responseData));
        }
    }
    catch (error) {
        response.status(500).json({ error: error });
        console.log(error);
    }
}