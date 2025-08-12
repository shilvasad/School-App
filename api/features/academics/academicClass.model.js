import mongoose from "mongoose";

 const academicClassSchema = new mongoose.Schema({
    grade: {
        type: String, 
        required: true, 
    },
    section: {
        type: String, 
        required: true, 
        enum: [ 'Primary', 'School', 'Cadet']
    },
    version:{
        type: String, 
        required: true,
         enum: ['Bangla', 'English', 'N/A']
    },
    groupName: {
        type: String, 
        required: false, 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }
 })
 
 const AcademicClass = mongoose.model('AcademicClass', academicClassSchema)
 export default AcademicClass