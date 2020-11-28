export default class Post {
    postId: number
    createdDate: Date
    title: string
    content: string
    userId: string
    headerImage: string
    lastUpdated: Date
    static counter: number = 0
    static posts: Post[] = []

    constructor(title, content, headerImage, userId) {
        this.postId = Post.counter++
        this.createdDate = new Date()
        this.title = title
        this.content = content
        this.userId = userId
        this.headerImage = headerImage
        this.lastUpdated = this.createdDate
    }

    save() {
        Post.posts.push(this)
    }

    static postExists(id) {
        for (let i = 0; i < Post.posts.length; i++) {
            if (Post.posts[i].postId == id) {
                return true
            }
        }
        return false
    }

    static formatDate(date: Date) {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
}