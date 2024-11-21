"use strict";
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
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { verify } = jsonwebtoken_1.default;
function verifyToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
                if (typeof data !== 'object') {
                    return response.status(401).json({ error: 'Invalid token' });
                }
                request.user_type = data.user_type;
                next();
            }
            catch (_a) {
                return response.status(401).json({ error: 'Invalid token' });
            }
        }
        else {
            return response.status(401).json({ error: 'No token provided' });
        }
    });
}
