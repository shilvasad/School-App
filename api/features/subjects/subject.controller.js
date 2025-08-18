import asyncHandler from "express-async-handler";
import Subject from "./subject.model.js";

/* 
  POST Controller
    @desc     Create  : createSubject
    @routes   POST    : /api/subjects/
    @access   Private
*/
const createSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const subject = new Subject({
    name: name,
    createdBy: req.user._id,
  });
  let createdSubject = await subject.save();
  createdSubject = await createdSubject.populate("createdBy", "name");
  res.status(201).json(createdSubject);
});

/*
GET Controller
  @desc       Read    : getSubjects
  @routes     GET     : /api/subjects
  @access     Private
*/
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  if (!subjects) {
    res.status(404).json({ message: "Subjects Empty" });
  }
  res.status(200).json(subjects);
});

/*  
  PUT Controller
    @desc         Update  : updateSubject
    @routes       PUT     : /api/subjects/:id
    @access       Private
*/
const updateSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const subject = await Subject.findById(req.params.id);
  if (subject) {
    subject.name = name || subject.name;
    subject.updatedBy = req.user._id;
    let updatedSubject = await subject.save();
    updatedSubject = await updatedSubject.populate("updatedBy", "name");
    res.status(200).json(updatedSubject);
  } else {
    res.status(404).json({ message: "Subject not found." });
  }
});
/*
  DELETE Controller
    @desc       Delete  : deleteSubject
    @routes     DELETE  : /api/subjects/:id
    @access     Private
*/
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
  if(subject){
    await subject.deleteOne()
    res.json({message: 'Subject deleted.'})
  }
  else{
    res.status(404)
    throw new Error('Subject not found.')
  }
});
export { createSubject, getSubjects, updateSubject, deleteSubject };
