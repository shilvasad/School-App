import express from 'express'
const router = express.Router()
import {createSubject} from './subject.controller.js'
import {protect, authorize} from '../../common/middleware/auth.middleware.js'

router.post('/', protect, authorize('admin'), createSubject)
export default router
