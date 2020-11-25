import jwt from 'jsonwebtoken'
import User from '../resources/user/user.model'

export const newToken = user => {
    return jwt.sign({ id: user.id }, 'my_secret', {
        expiresIn: '1h'
    })
}

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, 'my_secret', (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

export const signin = (req, res) => {
    
    if (!User.userIdExists(req.params.userId)) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Invalid Username or Password'
        })
    }
    
    const user = User.getUser(req.params.id);
    const match = user.checkPassword(req.params.password);

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

export const protect = (req, res, next) => {
    next()
}
