import express from 'express'
import {createClassroom} from '../controllers/classroomController'
import {protect, authorize} from '../middleware/authMiddleware'
const router = express.Router()

router.post('/', protect, authorize('admin'), createClassroom )

export default router

