import jwt from 'jsonwebtoken'

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

export const signin = async (req, res) => {}

export const protect = async (req, res, next) => {
    next()
}