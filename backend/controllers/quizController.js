import asyncHandler from 'express-async-handler'
import Quiz from '../models/Quiz.js'
import { validationResult } from 'express-validator'

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find()
    res.json(quizzes)
})

// @desc    Get a single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id)
    if (quiz) res.json(quiz)
    else {
        res.status(404)
        throw new Error('Quiz not found')
    }
})

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private
export const createQuiz = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const quiz = new Quiz(req.body)
    const created = await quiz.save()
    res.status(201).json(created)
})

// @desc    Update an existing quiz
// @route   PUT /api/quizzes/:id
// @access  Private
export const updateQuiz = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const quiz = await Quiz.findById(req.params.id)
    if (!quiz) {
        res.status(404)
        throw new Error('Quiz not found')
    }

    // Only update allowed fields
    quiz.title = req.body.title || quiz.title
    quiz.courseName = req.body.courseName || quiz.courseName
    quiz.topic = req.body.topic || quiz.topic
    quiz.dueDate = req.body.dueDate || quiz.dueDate
    quiz.quizLink = req.body.quizLink || quiz.quizLink

    const updated = await quiz.save()
    res.json(updated)
})

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
export const deleteQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id)
    if (!quiz) {
        res.status(404)
        throw new Error('Quiz not found')
    }

    await quiz.deleteOne() // ✅ FIXED: .remove() replaced
    res.json({ message: 'Quiz removed' })
})
