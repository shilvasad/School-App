import express from 'express'


const router = express.Router()

// Simple API root router for test
router.get('/', (req, res)=>{
    res.send('API is running...')
})


export default router
