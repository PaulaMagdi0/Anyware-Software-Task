import express from 'express'
import { check } from 'express-validator'
import {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from '../controllers/announcementController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

const announcementValidationCreate = [
    check('teacherName', 'Teacher name is required').notEmpty(),
    check('date', 'Valid date is required').isISO8601(),
    check('imageUrl', 'Valid image URL is required').isURL(),
    check('description', 'Announcement description is required').notEmpty(),
]

const announcementValidationUpdate = [
    check('teacherName').optional().notEmpty(),
    check('date').optional().isISO8601(),
    check('imageUrl').optional().isURL(),
    check('description').optional().notEmpty(),
]

router.get('/', protect, getAnnouncements)
router.get('/:id', protect, getAnnouncement)
router.post('/', protect, announcementValidationCreate, createAnnouncement)
router.put('/:id', protect, announcementValidationUpdate, updateAnnouncement)
router.delete('/:id', protect, deleteAnnouncement)

export default router
