import Router from 'express'
import PostCategory from '../post-category/post-category.model';
import Category from './category.model';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(Category.categories)
})

router.post('/', (req, res) => {
    
    if (Category.categoryExists(req.body.categoryName)) {
        return res.status(409).json({
            message: "Conflict, duplicate categoryName",
            status: 409
        })
    }

    const cat = new Category(req.body.categoryName, req.body.categoryDescription)
    Category.categories.push(cat)

    return res.status(201).json({
        categoryId: cat.categoryId,
        categoryName: cat.categoryName,
        categoryDescription: cat.categoryDescription
    })
})

router.get('/:categoryId', (req, res) => {
    let match;
    for (const category of Category.categories) {
        if (category.categoryId === parseInt(req.params.categoryId)) {
            match = category
        }
    }

    if (match) {
        return res.status(200).json({
            categoryId: match.categoryId,
            categoryName: match.name,
            categoryDescription: match.description
        })
    }

    return res.status(404).json({
        message: "Category not Found",
        status: 404
    })
})

router.patch('/:categoryId', (req, res) => {
    if (!Category.categoryExists(req.params.categoryId)) {
        return res.status(404).json({
            message: 'Category not found',
            status: 404
        })
    }

    let category = Category.getCategory(req.params.categoryId)
    
    if (req.body.categoryName) {
        category.categoryName = req.body.categoryName 
    }

    if (req.body.categoryDescription) {
        category.categoryDescription = req.body.categoryDescription 
    }

    return res.status(201).json(category)
})

router.delete('/:categoryId', (req, res) => {
    if (!Category.categoryExists(req.params.categoryId)) {
        return res.status(404).json({
            message: 'Category not found',
            status: 404
        })
    }

    Category.categories = Category.categories.filter(category => {
        return (category.categoryId + '') != req.params.categoryId
    })

    PostCategory.postCategories = PostCategory.postCategories.filter(postCategory => {
        return (postCategory.categoryId + '') != req.params.categoryId
    })

    return res.status(204).json({
        message: 'Category Deleted',
        status: 204
    })
})

export default router