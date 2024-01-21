import jwt from 'jsonwebtoken';
import { verifyGoogleToken } from '../../services/googleOAuth/verifyToken.js';



export const createToken = async (user) => {
    try
    {
        const expiresIn = process.env.JWT_EXPIRES_IN
        const token = await jwt.sign(user, process.env.JWT_SECRET, {expiresIn}); //expires in 5 min
        return token;
    }
    catch (err)
    {
        console.log(err);
    }
}


export const verifyToken = async (token, provider) => {
    try
    {
        if (provider === 'Server')
        {
            const isVerified =  await jwt.verify(token, process.env.JWT_SECRET);
            return isVerified;
        }
        else if (provider === 'Google')
        {
            const payload = await verifyGoogleToken(token);
            if (!payload || payload === null || payload.iss !== process.env.GOOGLE_ISS)
            {
                return false;
            }
            return true;
        }
        
    }
    catch (err)
    {
        console.log(err);
    }
}

