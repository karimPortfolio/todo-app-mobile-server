import RateLimit from 'express-rate-limit';

export const limiter = RateLimit({
    windowMs:15 * 60 * 1000, // 15 min
    max:50, // limit each ip address to 50 request per 15 min 
});
