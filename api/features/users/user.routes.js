import express from 'express'
import {registerUser, loginUser} from './user.controller.js'
const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/test', (req, res)=>{
    res.status(200).json({
        message: "Testing Router"
    })
})

export default router