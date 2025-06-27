import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    title: String,
    courseName: String,
    topic: String,
    dueDate: Date,
    quizLink: String,
})

export default mongoose.model('Quiz', quizSchema)
