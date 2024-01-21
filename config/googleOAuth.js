import { OAuth2Client } from 'google-auth-library';
import { configDotenv } from 'dotenv';

configDotenv();

export const client = new OAuth2Client(process.env.CLIENT_ID);
