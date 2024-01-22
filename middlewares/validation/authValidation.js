import validator from 'validator';
import { load } from 'cheerio';

function filterHtmlTags(input) {
    const $ = load(input);
    return $.text();
}

export const validateUserCredentialsRegister = (req, res, next) => {
    if (!req.body.name && !req.body.email && !req.body.password && !req.body.passwordConfirm)
    {
        return res.status(401).json({type:'failed', element:"all", message:'Please provide all required fields.'});
    }

    if (
        typeof req.body.name !== 'string' ||
        typeof req.body.email !== 'string' || 
        typeof req.body.password !== 'string'
    ) 
    {
        return res.status(400).json({type:'failed', message:'Invalid email or password.'});
    } 

    //remove html tags
    const name = filterHtmlTags(req.body.name);
    const email = filterHtmlTags(req.body.email);
    const password = filterHtmlTags(req.body.password);
    const passwordConfirm = filterHtmlTags(req.body.passwordConfirm);

    // Validate Name
    if (
        typeof name !== 'string' || 
        !validator.isAlpha(name.replace(/\s/g, ''))
    ) {
        return res.status(400).json({ type: 'failed', element:"name", message: 'Invalid name format.' });
    }

    // Validate Email Format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ type: 'failed', element:"email", message: 'Invalid email format.' });
    }

    //Password Strength Validation
    if (!validator.isStrongPassword(password, { 
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1 
    })) {
        return res.status(400).json({
            type: 'failed',
            element:"password",
            message: 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.',
        });
    }

    //check if password's not matched
    if (passwordConfirm !== password)
    {
        return res.status(400).json({
            type: 'failed',
            element:"passwordConfirm",
            message: "Password's doesn't matched." ,
        });
    }


    req.body = {
        name,
        email,
        password,
    }

    next()
}


export const validateUserCredentialsLogin = (req, res, next) => {
    if (!req.body.password && !req.body.email) 
    {
        return res.status(400).json({
            type:'failed',
            message:'Please provide all required fields.'
        });
    } 

    if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string')
    {
        return res.status(400).json({type:'failed', message:'Invalid email or password.'});
    }

    const email = filterHtmlTags(req.body.email);
    const password = filterHtmlTags(req.body.password);

    

    req.body = {
        email,
        password
    }

    next()
}

