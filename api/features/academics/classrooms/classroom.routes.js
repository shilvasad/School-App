import express from 'express'
import {createClassroom, updateClassroom, deleteClassroom, getClassrooms} from './classroom.controller.js'
import {protect, authorize} from '../../../common/middleware/auth.middleware.js'
const router = express.Router()

router.post('/', protect, authorize('admin'), createClassroom )
router.get('/', protect, authorize('admin'), getClassrooms)
router.put('/:id', protect, authorize('admin',  updateClassroom))
router.delete('/:id', protect, authorize('admin',  deleteClassroom))

export default router

