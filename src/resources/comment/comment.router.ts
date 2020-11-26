import { Router } from 'express'
import Post from '../post/post.model';
import Comment from '../comment/comment.model'

const router = Router();

router.get('/:postId', (req, res) => {
    if (!Post.postExists(req.params.postId)) {
        return res.status(404).json({
            message: "Post not found",
            status: 404
        })
    }

    let relatedComments = Comment.comments.filter(comment => comment.postId === req.params.postId)
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

export default router