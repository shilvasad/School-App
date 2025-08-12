import mongoose from "mongoose";

const dailyModificationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    scheduleEntryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScheduleEntry',
        required: true, 
    },
    type: {
        type: String, 
        required: true, 
        enum: ['ABSENCE', 'CLASS_SWAP'],
    },
    status: {
        type: String, 
        required: true, 
        enum: ['NEEDS_PROXY', 'RESOLVED'], 
        default: 'NEED_PROXY'
    },
    originalTeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    proxyTeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    notes: {
        type: String, 
    }
}, {
    timestamps: true, 
})

const DailyModification = mongoose.model('DailyModification', dailyModificationSchema)
export default DailyModification