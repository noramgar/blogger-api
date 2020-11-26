import Router from 'express'
import Category from './category.model';

const router = Router();

router.get('/', (req, res) => {
    res.json(Category.categories)
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
        categoryName: cat.name,
        categoryDescription: cat.description
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
        return res.json({
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

export default router