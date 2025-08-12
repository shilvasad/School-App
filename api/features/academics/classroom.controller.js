import asyncHandler from "express-async-handler";
import Classroom from "../models/classroom.model.js";
import AcademicClass from '../models/academicClass.model.js'

const createClassroom = asyncHandler(async (req, res) => {
  const { name, academicClasses } = req.body;
  const classroom = new Classroom({
    name,
    academicClasses,
    createdBy: req.user._id,
  });
  let createdClassroom = await classroom.save()
  createdClassroom = await createdClassroom.populate([
    {
    path: 'academicClasses',
    model: 'AcademicClass',    
  },
  {
    path: 'createdBy',
    select: 'name'
  }
  ])
  res.status(201).json(createdClassroom)
});

export { createClassroom };
