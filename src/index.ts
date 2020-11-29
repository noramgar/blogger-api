import express from 'express'
import userRouter from './resources/user/user.router'
import postRouter from './resources/post/post.router'
import categoryRouter from './resources/category/category.router'
import postCategoryRouter from './resources/post-category/post-category.router'
import commentRouter from './resources/comment/comment.router'

import { json, urlencoded } from 'body-parser'

const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/Users', userRouter)
app.use('/Posts', postRouter)
app.use('/Categories', categoryRouter)
app.use('/PostCategory', postCategoryRouter)
app.use('/Comments', commentRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})