export default class PostCategory {
    categoryId: number
    postId: number

    constructor(categoryId: number, postId: number) {
        this.categoryId = categoryId
        this.postId = postId
    }
}