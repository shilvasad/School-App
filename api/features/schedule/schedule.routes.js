import express from 'express'
import {getScheduleForToday, createScheduleEntry, deleteScheduleEntry, updateScheduleEntry} from './schedule.controller.js'
import {authorize, protect} from '../../common/middleware/auth.middleware.js'

const router = express.Router()

router.get('/today', protect, getScheduleForToday)
router.post('/', protect, authorize('admin'), createScheduleEntry)
router.delete('/:id', protect, authorize('admin'), deleteScheduleEntry)
router.put('/:id', protect, authorize('admin'), updateScheduleEntry)
export default router