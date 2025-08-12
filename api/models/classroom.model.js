import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true, 
    },
    academicClasses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AcademicClass'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }
})

const Classroom = mongoose.model('Classroom', classroomSchema)

export default Classroom