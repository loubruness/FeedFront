import jwt from 'jsonwebtoken';

const { verify } = jwt;

export async function verifyToken(request: { get: (arg0: string) => any; user_type: any; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => void) {
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
                return response.status(401).json({error: 'Invalid token'});
            }
            
            request.user_type = data.user_type;
            
            next();    
        }
        catch {
            return response.status(401).json({error: 'Invalid token'});
        }
    } else {
        return response.status(401).json({error: 'No token provided'});
    }
}
