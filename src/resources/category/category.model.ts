export default class Category {
    categoryId: number = 0
    name: string
    description: string
    static counter: number = 0

    constructor(name, description) {
        this.categoryId = Category.counter++    
        this.name = name
        this.description = description
    }
}