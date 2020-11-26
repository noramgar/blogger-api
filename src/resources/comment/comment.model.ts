export default class Comment {
    commentId: number = 0
    comment: string
    userId: string
    postId: string
    commentDate: Date
    static counter: number = 0
    static comments: any[]

    constructor(comment, userId, postId, commentDate) {
        this.commentId = Comment.counter++
        this.comment = comment
        this.userId = userId
        this.postId = postId
        this.commentDate = commentDate    
    }

    
}