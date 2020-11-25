import Router from 'express'
import Post from './post.model'

const router = Router();

router.get('/', (req, res) => {
    res.json(Post.posts)
})

router.get('/:postId', (req, res) => {
    let match;
    for (const post of Post.posts) {
        if (post.postId === parseInt(req.params.postId)) {
            match = post;
        }
    }
    if (match) {
        return res.json(match)
    }
    return res.status(404).send('post does not exist')
})

router.post('/', (req, res) => {
    
})
export default router