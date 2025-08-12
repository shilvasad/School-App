import mongoose from "mongoose";

const scheduleEntrySchema = mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  classPeriodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassPeriod",
    required: true,
  },
});

const ScheduleEntry = mongoose.model('ScheduleEntry', scheduleEntrySchema)
export default ScheduleEntry