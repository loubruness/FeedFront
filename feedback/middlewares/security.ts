import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const { verify } = jwt;

export async function verifyToken(request: Request, response: Response, next: () => void) : Promise<void> {
    console.log('middleware');
    let token = request.get("Authorization");
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    if (token) {
        try {

            const secretKey = process.env.SECRET_KEY;

            if (!secretKey) {
                throw new Error("SECRET_KEY is not defined in the environment variables");
            }
            const data = verify(token, secretKey);

            if(typeof data !== 'object') {
                response.status(401).json({error: 'Invalid token'});
            }
            
            if (typeof data === 'object' && 'user_role' in data) {
                console.log(data);
                request.body.user_id = (data as jwt.JwtPayload).user_id;
                request.body.user_role = (data as jwt.JwtPayload).user_role;
                if(request.body.user_role != 'admin' && request.body.user_role != 'student' && request.body.user_role != 'teacher') {
                    response.status(401).json({error: 'Unauthorized'});
                    return;
                }
            } else {
                response.status(401).json({error: 'Invalid token'});
                return;
            }
            
            next();    
        }
        catch {
            response.status(401).json({error: 'Invalid token'});
        }
    } else {
        response.status(401).json({error: 'No token provided'});
    }
}
