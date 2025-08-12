import express from 'express'
import {createAcademicClass, getAcademicClasses} from '../controllers/academicClassController.js'
import {protect, authorize} from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', protect, authorize('admin'), createAcademicClass)
router.get('/', protect, getAcademicClasses)

export default router