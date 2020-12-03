import Router from 'express'
import { protect } from '../../utils/auth';
import Category from '../category/category.model';
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
    
    let relatedPostCats = PostCategory.postCategories.filter(postcat => {
        return postcat.postId + '' == req.params.postId
    })

    let relatedCategories = []
    for (let postcat of relatedPostCats) {
        for (let cat of Category.categories) {
            if (postcat.categoryId == cat.categoryId) {
                relatedCategories.push(cat)
            }
        }
    }

    return res.status(200).json({
        postId: req.params.postId,
        categories: relatedCategories
    })
})

router.get('/Posts/:categoryId', (req, res) => {
    if (!Category.categoryExists(req.params.categoryId)) {
        return res.status(404).json({
            message: 'Category not found',
            status: 404
        })
    }

    let relatedPostCats = PostCategory.postCategories.filter(postcat => {
        return postcat.categoryId+'' === req.params.categoryId
    })

    let posts = []
    for (let postcat of relatedPostCats) {
        for (let post of Post.posts) {
            if (postcat.postId == post.postId) {
                posts.push(post)
            }
        }
    }

    return res.status(200).json({
        categoryId: req.params.categoryId,
        posts: posts
    })
})

router.use(protect)

router.post('/:postId/:categoryId', (req: any, res) => {
    let foundCategory = Category.categories.find(c => c.categoryId+'' === req.params.categoryId)
    let foundPost = Post.posts.find(p => p.postId+'' === req.params.postId)

    if (foundCategory && foundPost) {

        if (foundPost.userId !== req.user.userId) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized - Access token is missing or invalid'
            })
        }

        let postcat = new PostCategory(foundCategory.categoryId, foundPost.postId)
        PostCategory.postCategories.push(postcat)
        return res.status(201).json({
            status: 201,
            message: 'Category assigned to Post'
        })
    }
    else {
        return res.status(404).json({
            status: 404,
            message: 'Post or Category not found'
        })
    }
})

router.delete('/:postId/:categoryId', (req: any, res) => {
    let foundCategory = Category.categories.find(c => c.categoryId+'' === req.params.categoryId)
    let foundPost = Post.posts.find(p => p.postId+'' === req.params.postId)

    if (foundCategory && foundPost) {

        if (foundPost.postId !== req.user.userId) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized - Access token is missing or invalid'
            })
        }

        PostCategory.postCategories.filter(pc => {
            return pc.postId+'' !== req.params.postId && pc.categoryId+'' !== req.params.categoryId
        })

        return res.status(204).json({
            status: 204,
            message: 'Category removed from Post'
        })
    }
    else {
        return res.status(404).json({
            status: 404,
            message: 'Post or Category not found'
        })
    }
})

export default router