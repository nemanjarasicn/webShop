const jwt = require('jsonwebtoken')

const secret = '{wXRt3EJ1as56das15$32dz6[|McoL-S%s'
const options = {
    algorithm: 'HS512',
    expiresIn: '16h',
    header: {
        typ: 'JWT'
    }
}

export const giveAccess = (req, payload: {user_id: string}) => {
    req.session.jwt = jwt.sign(payload, secret, options)
}

export const simpleVerifyJWT = (token) => {
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        return jwt.verify(token, secret, options)
    }
    catch(e){
        //if an error occured return request unauthorized error
        console.log(e)
        return false
    }
}

export const verifyJWT = (req, res, next) =>{
    let accessToken = req.session.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log("ACCESS NOT OK, NO TOKEN")
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, secret, options)
        console.log("ACCESS OK")
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        console.log("ACCESS NOT OK")
        console.log(e)
        return res.status(401).send()
    }
}

export const killCookie = (req) => {
    req.session.destroy()
}


