import { Router } from 'express'
import Post from '../post/post.model';
import Comment from '../comment/comment.model'
import { protect } from '../../utils/auth';

const router = Router();

router.get('/:postId', (req, res) => {
    if (!Post.postExists(req.params.postId)) {
        return res.status(404).json({
            message: "Post not found",
            status: 404
        })
    }

    let relatedComments = Comment.comments.filter(comment => comment.postId+'' === req.params.postId)
    
    let results = relatedComments.map(comment => {
        return {
            commentId: comment.commentId,
            comment: comment.comment,
            userId: comment.userId,
            postId: comment.postId,
            commentDate: comment.commentDate
        }
    })

    return res.status(200).json(results)
})

router.use(protect)

router.post('/:postId', (req: any, res) => {
    if (!Post.postExists(req.params.postId)) {
        return res.status(404).json({
            message: 'Post Not Found',
            status: 404
        })
    }

    let comment = new Comment(req.body.comment, req.user.userId, req.params.postId)
    comment.save()

    return res.status(201).json(comment)
})

router.patch('/:postId/:commentId', (req, res) => {
    
    let foundComment = Comment.comments.find(c => {
        return c.commentId+'' == req.params.commentId && c.postId+'' == req.params.postId
    })
    
    if (!foundComment) {
        return res.status(404).json({
            message: 'Comment or Post not found',
            status: 404
        })
    }

    let comment = Comment.getComment(req.params.commentId, req.params.postId)
    comment.comment = req.body.comment

    return res.status(201).json(comment)
})

router.delete('/:postId/:commentId', (req, res) => {
    if (!Comment.commentExists(req.params.commentId)) {
        return res.status(404).json({
            message: 'Comment or Post not found',
            status: 404
        })
    }

    Comment.comments = Comment.comments.filter(comment => {
        return (comment.commentId + '') != req.params.commentId
    })

    return res.status(204).json({
        message: 'Comment removed from Post',
        status: 204
    })
})

export default router