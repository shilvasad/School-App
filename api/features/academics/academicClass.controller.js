import asyncHandler from "express-async-handler";
import AcademicClass from "./academicClass.model.js";

// New Academic Class 
const createAcademicClass = asyncHandler(async (req, res) => {
  const { grade, section, version, groupName } = req.body;
  const academicClass = new AcademicClass({
    grade,
    section,
    version,
    groupName,
    createdBy: req.user._id,
  });
  let createdAcademicClass = await academicClass.save();
  createdAcademicClass = await createdAcademicClass.populate(
    "createdBy",
    "name"
  );
  res.status(201).json(createdAcademicClass)
});

// Getting All Academic Classes
const getAcademicClasses = asyncHandler(async(req, res)=>{
  const academicClasses = await AcademicClass.find({})
  res.json(academicClasses)
})

export { createAcademicClass, getAcademicClasses };
