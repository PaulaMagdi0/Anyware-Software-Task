import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/announcements', announcementRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
