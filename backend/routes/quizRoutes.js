import express from 'express'
import { check } from 'express-validator'
import {
    getQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
} from '../controllers/quizController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

const quizValidationCreate = [
    check('title', 'Title is required').notEmpty(),
    check('courseName', 'Course name is required').notEmpty(),
    check('topic', 'Topic is required').notEmpty(),
    check('dueDate', 'Valid date required').isISO8601(),
    check('quizLink', 'Valid URL required').isURL(),
]

const quizValidationUpdate = [
    check('title').optional().notEmpty(),
    check('courseName').optional().notEmpty(),
    check('topic').optional().notEmpty(),
    check('dueDate').optional().isISO8601(),
    check('quizLink').optional().isURL(),
]

router.get('/', protect, getQuizzes)
router.get('/:id', protect, getQuiz)
router.post('/', protect, quizValidationCreate, createQuiz)
router.put('/:id', protect, quizValidationUpdate, updateQuiz)
router.delete('/:id', protect, deleteQuiz)

export default router
