import express from 'express'
import {getScheduleForToday} from '../controllers/scheduleController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/today', protect, getScheduleForToday)

export default router