import express from 'express'
import {getScheduleForToday} from './schedule.controller.js'
import {protect} from '../../common/middleware/auth.middleware.js'

const router = express.Router()

router.get('/today', protect, getScheduleForToday)

export default router