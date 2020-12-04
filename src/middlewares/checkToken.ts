import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = <string>req.headers.authorization;
        const token = authHeader.match(/(?<=Bearer\s).*/)[0];
        const tokenPayload = jwt.verify(token, <string>process.env.JWT_SECRET);
        res.locals.tokenPayload = tokenPayload;
    } catch (error) {
        res.status(401).json({message: "you must provide a valid token"});
        return;
    }
    
    return next();
}