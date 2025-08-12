import asyncHandler from 'express-async-handler'
import Subject from '../models/subject.model.js'

const createSubject =  asyncHandler(async(req , res )=>{
const {name} = req.body
const subject = new Subject({
    name: name,
    createdBy: req.user._id,
})
const createdSubject = await subject.save()
res.status(201).json(createdSubject)
})


export {createSubject}