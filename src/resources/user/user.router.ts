import Router from 'express'
import { newToken, signin, protect } from '../../utils/auth'
import User from './user.model'
import * as EmailValidator from 'email-validator';

const router = Router()

router.get('/:userId/:password', signin)

router.post('/', (req, res) => {
    
    if (!req.body.userId || 
        !req.body.firstName || 
        !req.body.lastName || 
        !req.body.emailAddress ||
        !EmailValidator.validate(req.body.emailAddress) ||
        !req.body.password ||
        req.body.userId.trim() === '')
        {
        res.status(406).json({
            message: "Not Acceptable: Bad data in the entity",
            status: 406
        })
    }

    else if (User.userIdExists(req.body.userId)) {
        res.status(409).json({
            message: "username is taken",
            status: 409
        })
    }
    
    else {
        const newUser = new User(req.body.userId, req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.password)
        newUser.save()

        console.log('token: ', newToken(newUser))

        res.status(201).json({
            userId: newUser.userId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            emailAddress: newUser.emailAddress
        })   
    }
})

router.use(protect)

router.get('/', (req, res) => {
    let users = User.users.map(user => {
        return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        }
    })
    
    res.json(users)
})

router.get('/:userId', (req, res) => {
    if (User.userIdExists(req.params.userId)) {
        res.json(User.getUser(req.params.userId))
    }
    else {
        res.status(404).json({
            statusCode: 404,
            message: "User not found"
        })
    }
})

router.patch('/:id', (req, res) => {
    
    if (!EmailValidator.validate(req.body.emailAddress)) {
        return res.status(406).json({
            message: "Not Acceptable: Bad data in the entity",
            status: 406
        })
    }
    
    if (User.userIdExists(req.params.id)) {
        const user = User.getUser(req.params.id)
        user?.update(req.body)
        res.json({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        })
    }
    else {
        return res.status(404).json({
            statusCode: 404,
            message: "User not found"
        })
    }
})

router.delete('/:id', (req, res) => {
    if (User.userIdExists(req.params.id)) {
        User.deleteUser(req.params.id);
        res.status(204).json({
            message: "User Deleted",
            status: 204
        })
    }
    else {
        res.status(404).json({
            statusCode: 404,
            message: "User not found"
        })
    }
})

export default router