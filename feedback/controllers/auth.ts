// import { checkExistsUser, createUser, getUserByEmailwithHashedPassword, getUserById } from '../database/queries/auth.tsx';

import 'dotenv/config';

import { Request, Response } from "express";
import { decryptRole, encryptRole } from "./cryptor";

import jwt from 'jsonwebtoken';

const { sign } = jwt;

function createToken(user_id: number, user_type: string) {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    
    return sign({user_id: user_id, user_type: user_type}, secretKey, { expiresIn: '1h' });
}

async function login(request: Request, response: Response) : Promise<void>{
    
    console.log(request.body);
    const email = request.body.email;
    const password = request.body.password;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "email": email,
    "password": password
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect
    };

    try {
        const fetchResponse = await fetch("http://localhost:8000/user/login", requestOptions);
        const result = await fetchResponse.json();

        console.log(result);

        if(result != null){
            const cryptedRole = await encryptRole(result.role);
            response.status(200).json({info: "user logged in successfully", token: createToken(result.id, result.role), role: cryptedRole});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({error: "Internal Server Error"});
    }
}

async function decryptUserRole(request: Request, response: Response): Promise<void> {
    const cryptedRole = request.query.cryptedRole as string;
    const iv = request.query.iv as string;
    if (!cryptedRole) {
        response.status(400).json({error: "No cryptedRole provided"});
        return;
    }else{
        response.status(200).json({role: decryptRole(cryptedRole, iv)});
    }
}

// async function createUserAction(request, response) {
//     if (!await checkExistsUser(request.body.email)) {
//         const hashed_password = await hash(request.body.password, 10);
//         const id = await createUser(request.body.email, hashed_password, request.body.username, request.body.name, request.body.lastname, request.body.birthdate, request.body.gender, false);
//         if (id != null) {
//             console.log('[',request.ip,'] CREATED User: ', id);
//             response.status(200).json({info: "user created successfully", created_user: await getUserById(id.id)});
//         }
//         else {
//             response.status(400).json({error: "Impossible to create the user"});
//         }
//     }
//     else {
//         response.status(400).json({error: "email already taken"});
//     }
// }

// async function loginUserAction(request, response) {
//     const user = await getUserByEmailwithHashedPassword(request.body.email);
//     //console.log(user);
//     if (user != null && await compare(request.body.password, user.hashed_password)) {
//         const token = createToken(user.id, "Guide");
//         if (token != null) {
//             console.log('[',request.ip,'] LOGGED IN User: ', user.id);
//             response.status(200).json({info: "user logged in successfully", token: token, user_id: user.id, admin: user.admin});
//         }
//         else {
//             response.status(400).json({error: "Impossible to create the token"});
//         }
//     }
//     else {
//         response.status(400).json({token: null});
//     }
// }

// async function verifyTokenAction(request, response) {
//     return response.status(200).json({info: 'Valid token', user_id: request.user_id});
// }

export {
    login,
    decryptUserRole
};