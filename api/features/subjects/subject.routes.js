import express from 'express'
const router = express.Router()
import {createSubject, deleteSubject, getSubjects, updateSubject} from './subject.controller.js'
import {protect, authorize} from '../../common/middleware/auth.middleware.js'
/*  
    @access Private
    @desc Subject CURD 
    @routes 
        POST    : /api/subjects/
        PUT     : /api/subjects/:id
        GET     : /api/subjects
        DELETE  : /api/subjects/:id

*/
router.post('/', protect, authorize('admin'), createSubject)
router.get('/', protect, getSubjects)
router.put('/:id', protect, authorize('admin'), updateSubject)
router.delete('/:id', protect, authorize('admin'), deleteSubject)

export default router
