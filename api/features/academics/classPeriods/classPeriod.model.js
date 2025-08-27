import mongoose from "mongoose";

const classPeriodSchema = mongoose.Schema({
    name:{
        type: String, 
        required: true, 
        unique: true,
    },
    startTime: {
        type: String,
        required: true, 
    },
    endTime: {
        type: String, 
        required: true, 
    }
})

const ClassPeriod = mongoose.model('ClassPeriod', classPeriodSchema)

export default ClassPeriod