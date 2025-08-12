import express from 'express'
const router = express.Router()
import {createSubject} from './subject.controler.js'
import {protect, authorize} from '../../middleware/authMiddleware.js'

router.post('/', protect, authorize('admin'), createSubject)
export default router
