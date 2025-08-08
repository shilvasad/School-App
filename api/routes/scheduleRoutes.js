import express from 'express'
import {getScheduleForToday} from '../controllers/scheduleController.js'
const router = express.Router()

router.get('/today', getScheduleForToday)

export default router