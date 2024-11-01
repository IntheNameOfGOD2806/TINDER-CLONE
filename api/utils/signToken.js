import jwt from 'jsonwebtoken';

export const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
        algorithm: 'HS256',
    }, (err, token) => {
        console.log(">>> check jwt auth token:", token)
    }
    );
}