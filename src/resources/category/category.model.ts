export default class Category {
    categoryId: number = 0
    name: string
    description: string
    static counter: number = 0

    static categories: Category[] = []

    constructor(name, description) {
        this.categoryId = Category.counter++    
        this.name = name
        this.description = description
    }

    static categoryExists(name): boolean {
        for (let i = 0; i < Category.categories.length; i++) {
            if (Category.categories[i].name == name) {
                return true
            }
        }
        return false
    }
}