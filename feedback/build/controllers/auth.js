"use strict";
// import { checkExistsUser, createUser, getUserByEmailwithHashedPassword, getUserById } from '../database/queries/auth.tsx';
// import { compare, hash } from 'bcrypt';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign } = jsonwebtoken_1.default;
function createToken(user_id, user_type) {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    return sign({ user_id: user_id, user_type: user_type }, secretKey, { expiresIn: '1h' });
}
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
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
            redirect: "follow"
        };
        try {
            const fetchResponse = yield fetch("http://localhost:8000/user/login", requestOptions);
            const result = yield fetchResponse.json();
            console.log(result);
            if (result != null) {
                response.status(200).json({ info: "user logged in successfully", token: createToken(result.id, result.role), user_id: result.id, role: result.role });
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: "Internal Server Error" });
        }
    });
}
