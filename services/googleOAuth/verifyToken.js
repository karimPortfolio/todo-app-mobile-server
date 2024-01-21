import { client } from "../../config/googleOAuth.js";
import { configDotenv } from "dotenv";

configDotenv();

export const verifyGoogleToken = async (token) => 
{
    try
    {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    catch (err)
    {
        console.log(err);
        return;
    }
}

