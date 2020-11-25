import Router from 'express'
import { signin } from '../../utils/auth'
import User from './user.model'

const router = Router()

router.get('/', (req, res) => {
    res.json(User.users)
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

router.post('/', (req, res) => {
    
    if (!req.body.userID || 
        !req.body.firstName || 
        !req.body.lastName || 
        !req.body.email || 
        !req.body.password ||
        req.body.userID.trim() === ''
        ) 
        {
        res.status(400).json({
            message: "invalid request"
        })
    }

    else if (User.userIdExists(req.body.userID)) {
        res.status(403).json({
            message: "username is taken"
        })
    }
    
    else {
        const newUser = new User(req.body.userID, req.body.firstName, req.body.lastName, req.body.email, req.body.password)
        newUser.save()

        res.status(201).json(newUser)   
    }
})

router.patch('/:id', (req, res) => {
    if (User.userIdExists(req.params.id)) {
        const user = User.getUser(req.params.id)
        user?.update(req.body)
        res.json(user)
    }
    else {
        res.status(404).json({
            statusCode: 404,
            message: "User not found"
        })
    }
})

router.delete('/:id', (req, res) => {
    if (User.userIdExists(req.params.id)) {
        User.deleteUser(req.params.id);
        res.json({
            message: "User Deleted" 
        })
    }
    else {
        res.status(404).json({
            statusCode: 404,
            message: "User not found"
        })
    }
})

router.get('/:userId/:password', signin)

export default router