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
        return res.status(200).json(match)
    }
    return res.status(404).json({
        message: 'post does not exist',
        status: 404
    })
})

router.post('/', (req, res) => {
    let title = req.body.title
    let content = req.body.content
    let headerImage = req.body.headerImage

    if (!title || !content) {
        return res.status(406).json({
            message: 'Not Acceptable - Missing title or content',
            status: 406
        })
    }

    let post = new Post(title, content, headerImage, '**USER**')
    post.save()

    return res.status(201).json({
        postId: post.postId,
        createdDate: post.createdDate,
        title: post.title,
        content: post.content,
        userId: post.userId,
        headerImage: post.headerImage,
        lastUpdated: post.lastUpdated
    })
})

export default router