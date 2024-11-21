// import { checkExistsUser, createUser, getUserByEmailwithHashedPassword, getUserById } from '../database/queries/user.js';
// import { compare, hash } from 'bcrypt';

// import jwt from 'jsonwebtoken';

// const { sign } = jwt;

// function createToken(user_id, user_type) {
//     return sign({user_id: user_id, user_type: user_type}, process.env.SECRET_KEY, { expiresIn: '1h' });
// }

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

// export {
//     createUserAction,
//     loginUserAction,
//     verifyTokenAction
// };