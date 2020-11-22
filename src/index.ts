import express from 'express'
import userRouter from './resources/user/user.router'
import postRouter from './resources/post/post.router'
import categoryRouter from './resources/category/category.router'
import postCategoryRouter from './resources/post-category/post-category.router'
import commentRouter from './resources/comment/comment.router'

const app = express()
const port = 3000

app.use('/Users', userRouter)
app.use('/Posts', postRouter)
app.use('/Categories', categoryRouter)
app.use('/PostCategory', postCategoryRouter)
app.use('/Comments', commentRouter)

app.get('/', (req, res) => {
  res.send('Goodbye World')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})