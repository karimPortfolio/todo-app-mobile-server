import { verifyToken } from "../utils/jwt/jwt.js";



export const Auth = async (req, res, next) => {

    try{

        if (!req.header('Authorization'))
        {
            return res.status(401).json({
                type:'failed',
                message:'Sign in first to continue.',
            });
        }

        const token = req.header('Authorization').split(" ")[1];
        const provider = req.header('X-Token-Origin');

        if (!token || !provider)
        {
            return res.status(401).json({
                type:'failed',
                message:'Sign in first to continue.',
            });
        }

        const isVerified = await verifyToken(token, provider);
        if (!isVerified)
        {
            return res.status(401).json({
                type:'failed',
                message:'Sign in first to continue.',
            });
        }

        next();

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong, try again later',
        });
    }

}

