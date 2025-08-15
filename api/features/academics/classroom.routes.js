import express from 'express'
import {createClassroom} from './classroom.controller.js'
import {protect, authorize} from '../../common/middleware/auth.middleware.js'
const router = express.Router()

router.post('/', protect, authorize('admin'), createClassroom )

export default router

