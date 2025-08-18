import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true, 
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
        ref: 'User'
    }
})
const Subject = mongoose.model('Subject', subjectSchema)

export default Subject