export default class PostCategory {
    categoryId: number
    postId: number
    static postCategories: PostCategory[] = []

    constructor(categoryId: number, postId: number) {
        this.categoryId = categoryId
        this.postId = postId
    }
}