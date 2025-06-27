import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema({
  teacherName: String,
  date: Date,
  imageUrl: String,
  description: String,
})

export default mongoose.model('Announcement', announcementSchema)
