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

    constructor(createdDate, title, content, userId, headerImage, lastUpdated) {
        this.postId = Post.counter++
        this.createdDate = createdDate
        this.title = title
        this.content = content
        this.userId = userId
        this.headerImage = headerImage
        this.lastUpdated = lastUpdated
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
}