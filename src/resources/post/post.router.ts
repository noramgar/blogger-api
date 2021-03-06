import Router from 'express'
import { protect } from '../../utils/auth';
import PostCategory from '../post-category/post-category.model';
import User from '../user/user.model';
import Post from './post.model'

const router = Router();

router.get('/', (req, res) => {    
    let posts = Post.posts.map(post => {
        return {
            postId: post.postId,
            createdDate: Post.formatDate(post.createdDate),
            title: post.title,
            content: post.content,
            userId: post.userId,
            lastUpdated: Post.formatDate(post.lastUpdated)
        }
    })
    res.json(posts)
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

router.get('/User/:userId', (req, res) => {
    if (!User.userIdExists(req.params.userId)) {
        return res.status(404).json({
            message: 'Invalid User',
            status: 404
        })
    }

    let posts = Post.posts.filter(post => post.userId === req.params.userId)
    return res.status(200).json(posts)
})

router.use(protect)

router.post('/', (req: any, res) => {
    let title = req.body.title
    let content = req.body.content
    let headerImage = req.body.headerImage

    if (!title || !content) {
        return res.status(406).json({
            message: 'Not Acceptable - Missing title or content',
            status: 406
        })
    }

    let post = new Post(title, content, headerImage, req.user.userId)
    post.save()

    return res.status(201).json({
        postId: post.postId,
        createdDate: Post.formatDate(post.createdDate),
        title: post.title,
        content: post.content,
        userId: post.userId,
        headerImage: post.headerImage,
        lastUpdated: Post.formatDate(post.lastUpdated)
    })
})

router.patch('/:postId', (req: any, res) => {
    if (!Post.postExists(req.params.postId)) {
        return res.status(404).json({
            message: 'Post not found',
            status: 404
        })
    }

    let post;
    for (let p of Post.posts) {
        if (p.postId+'' === req.params.postId) {
            post = p
        }
    }

    if (post.userId !== req.user.userId) {
        return res.status(401).json({
            message: 'Access Denied: Current user is not the owner of this post',
            status: 401
        })
    }

    if (req.body.content) {
        post.content = req.body.content
    }

    if (req.body.headerImage) {
        post.headerImage = req.body.headerImage
    }

    post.lastUpdated = new Date()

    return res.status(200).json({
        postId: post.postId,
        createdDate: post.createdDate,
        title: post.title,
        content: post.content,
        userId: post.userId,
        lastUpdated: post.lastUpdated,
        headerImage: post.headerImage
    })
})

router.delete('/:postId', (req: any, res) => {
    if (!Post.postExists(req.params.postId)) {
        return res.status(404).json({
            message: 'Post not found',
            status: 404
        })
    }

    let match;
    for (let post of Post.posts) {
        if (post.postId+'' === req.params.postId) {
            match = post
        }
    }

    if (match.userId !== req.user.userId) {
        return res.status(401).json({
            message: 'Access Denied: Current user is not the owner of this post',
            status: 401
        })
    }

    Post.posts = Post.posts.filter(post => {
        return (post.postId + '') !== req.params.postId
    })

    PostCategory.postCategories = PostCategory.postCategories.filter(postCategory => {
        return (postCategory.postId + '') !== req.params.postId
    }) 

    return res.status(204).json({
        message: 'Post Deleted',
        status: 204
    })
})

export default router