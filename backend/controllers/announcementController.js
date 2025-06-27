import asyncHandler from 'express-async-handler'
import Announcement from '../models/Announcement.js'
import { validationResult } from 'express-validator'

// @desc    Get all announcements
export const getAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find()
    res.json(announcements)
})

// @desc    Get one announcement
export const getAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id)
    if (announcement) res.json(announcement)
    else {
        res.status(404)
        throw new Error('Announcement not found')
    }
})

// @desc    Create new announcement
export const createAnnouncement = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const announcement = new Announcement(req.body)
    const created = await announcement.save()
    res.status(201).json(created)
})

// @desc    Update announcement (partial fields supported)
export const updateAnnouncement = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const announcement = await Announcement.findById(req.params.id)
    if (!announcement) {
        res.status(404)
        throw new Error('Announcement not found')
    }

    // Only update provided fields
    announcement.teacherName = req.body.teacherName || announcement.teacherName
    announcement.date = req.body.date || announcement.date
    announcement.imageUrl = req.body.imageUrl || announcement.imageUrl
    announcement.description = req.body.description || announcement.description

    const updated = await announcement.save()
    res.json(updated)
})

// @desc    Delete announcement
export const deleteAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id)
    if (!announcement) {
        res.status(404)
        throw new Error('Announcement not found')
    }

    await announcement.deleteOne() // ✅ replaces deprecated .remove()

    res.json({ message: 'Announcement removed' })
})
