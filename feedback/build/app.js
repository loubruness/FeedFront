"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use('/auth', auth_1.default);
// app.listen(PORT, (error: any) =>{
//     if(!error)
//         console.log("Server is Successfully Running, and App is listening on port "+ PORT)
//     else 
//         console.log("Error occurred, server can't start", error);
//     }
// );
