export default class Category {
    categoryId: number = 0
    categoryName: string
    categoryDescription: string
    static counter: number = 0

    static categories: Category[] = []

    constructor(categoryName, categoryDescription) {
        this.categoryId = Category.counter++    
        this.categoryName = categoryName
        this.categoryDescription = categoryDescription
    }

    static categoryExists(id): boolean {
        for (let i = 0; i < Category.categories.length; i++) {
            if (Category.categories[i].categoryId == id) {
                return true
            }
        }
        return false
    }

    static getCategory(id) {
        for (let category of Category.categories) {
            if (category.categoryId == id) {
                return category
            }
        }
    }
}