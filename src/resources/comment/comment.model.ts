export default class Comment {
    commentId: number
    comment: string
    userId: string
    postId: number
    commentDate: Date
    static counter: number = 0
    static comments: Comment[] = []

    constructor(comment, userId, postId) {
        this.commentId = Comment.counter++
        this.comment = comment
        this.userId = userId
        this.postId = postId
        this.commentDate = new Date()   
    }

    save() {
        Comment.comments.push(this)
    }

    static getComment(commentId, postId) {
        for (let comment of Comment.comments) {
            if (comment.commentId == commentId && comment.postId == postId) {
                return comment
            }
        }
    }

    static commentExists(commentId) {
        for (const comment of Comment.comments) {
            if (comment.commentId === commentId) {
                return true;
            }
        }
        return false;
    }
}