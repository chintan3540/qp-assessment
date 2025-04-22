import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      
      req.user = decoded;
      next();
    });

  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

// export function authorize(requiredRole: string) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     // Check if req.user is a JwtPayload and has a role
    
//     if (
//       !req.user ||
//       typeof req.user === 'string' ||
//       !(req.user as JwtPayload).role
//     ) {
//       return res.status(403).json({ message: 'User does not have permission to perform this action.' });
//     }

//     const userRole = (req.user as JwtPayload).role;
    
//     if (userRole.toLowerCase() !== requiredRole.toLowerCase()) {
//       return res.status(403).json({ message: 'User does not have permission to perform this action.' });
//     }

//     next();
//   };
// }

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.user ||
      typeof req.user === 'string' ||
      !(req.user as JwtPayload).role
    ) {
      return res.status(403).json({ message: 'User does not have permission to perform this action.' });
    }

    const userRole = (req.user as JwtPayload).role.toLowerCase();

    if (!allowedRoles.map(role => role.toLowerCase()).includes(userRole)) {
      return res.status(403).json({ message: 'User does not have permission to perform this action.' });
    }

    next();
  };
}

