import asyncHandler from "express-async-handler";
import Classroom from "./classroom.model.js";
import AcademicClass from "./academicClass.model.js";

// Create classroom controller
const createClassroom = asyncHandler(async (req, res) => {
  const { name, academicClasses } = req.body;
  const classroom = new Classroom({
    name,
    academicClasses,
    createdBy: req.user._id,
  });
  let createdClassroom = await classroom.save();
  createdClassroom = await createdClassroom.populate([
    {
      path: "academicClasses",
      model: "AcademicClass",
    },
    {
      path: "createdBy",
      select: "name",
    },
  ]);
  res.status(201).json(createdClassroom);
});

// Update classroom controller

const updateClassroom = asyncHandler(async (req, res) => {
  const { name, academicClasses } = req.body;
  const classroom = await Classroom.findById(req.params.id);
  if (classroom) {
    classroom.name = name || classroom.name;
    classroom.academicClasses = academicClasses || classroom.academicClasses;
    classroom.updatedBy = req.user._id;
    let updatedClassroom = await classroom.save();
    updatedClassroom = await updatedClassroom.populate("updatedBy", "name");
    res.status(200).json(updatedClassroom);
  } else {
    res.status(404).json({ message: "Classroom not found." });
  }
});

// Delete classroom controller
const deleteClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id)
  if(classroom){
    await classroom.deleteOne()
    res.json({message: "Classroom deleted"})
  }
  else{
    res.status(404)
    throw new Error('Classroom not found.')
  }
});

// Get classrooms controller
const getClassrooms = asyncHandler(async (req, res) => {
  let classrooms = await Classroom.find()
  if(!classrooms){
    res.status(404).json({message: 'Classroom Emtry'})
  }
  classrooms = await classrooms.populate("academicClasses", "name")
  res.status(200).json(classrooms)
});

export { createClassroom, updateClassroom, deleteClassroom, getClassrooms };
