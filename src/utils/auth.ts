import jwt from 'jsonwebtoken'
import User from '../resources/user/user.model'

export const newToken = user => {
    return jwt.sign({ 
        UserData: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        } 
    }, 
    'my_secret', 
    {
        expiresIn: '3h',
        subject: user.userId
    })
}

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, 'my_secret', (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

export const signin = async (req, res) => {
    
    if (!User.userIdExists(req.params.userId)) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Invalid Username or Password'
        })
    }
    
    const user = User.getUser(req.params.userId);
    const match = await user.checkPassword(req.params.password);

    if (match) {
        return res.json({
            token: newToken(user)
        })
    } 
    else {
        return res.status(401).json({
            statusCode: 401,
            message: 'Invalid Username or Password'
        })
    }

}

export const protect = async (req, res, next) => {

    let authHeader = req.headers.authorization
    let token;
    if (authHeader) {
        token = authHeader.split('Bearer ')[1]
    }

    if (!authHeader || !token || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Invalid Authorization Header',
            status: 401
        })
    }

    token = token.trim()
    console.log('split:', token)
    let payload: any;

    try {
        payload = await verifyToken(token)
    } catch(e) {
        console.error(e)
        return res.status(401).json({
            message: 'Unauthorized - Access token is missing or invalid',
            status: 401
        })
    }

    const user = User.userIdExists(payload.UserData.userId)
    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized - Access token is missing or invalid',
            status: 401
        })
    }

    req.user = User.getUser(payload.UserData.userId)

    next()
}
