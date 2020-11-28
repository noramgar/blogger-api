import Router from 'express'
import { protect } from '../../utils/auth';
import Post from '../post/post.model';
import PostCategory from './post-category.model';

const router = Router();

router.get('/:postId', (req, res) => {
    if (!Post.postExists(req.params.postId)) {
        return res.status(404).json({
            message: 'Post not found',
            status: 404
        })
    }
    
    let relatedCategories = PostCategory.postCategories.filter(postcat => {
        return postcat.postId + '' == req.params.postId
    })

    return res.status(200).json({
        postId: req.params.postId,
        categories: relatedCategories
    })
})

router.get('/Posts/:categoryId', (req, res) => {})

router.use(protect)

router.post('/:postId/:categoryId', (req, res) => {})

router.delete('/:postId/:categoryId', (req, res) => {})

export default router