
import mongoose from 'mongoose';

// Create some placeholder ObjectId values for our related documents
const teacherId1 = new mongoose.Types.ObjectId();
const teacherId2 = new mongoose.Types.ObjectId();

const classroomId1 = new mongoose.Types.ObjectId();
const classroomId2 = new mongoose.Types.ObjectId();

const subjectId1 = new mongoose.Types.ObjectId();
const subjectId2 = new mongoose.Types.ObjectId();

const classPeriodId1 = new mongoose.Types.ObjectId();
const classPeriodId2 = new mongoose.Types.ObjectId();

const scheduleEntryData = [
  {
    _id: new mongoose.Types.ObjectId(),
    teacherId: teacherId1,
    classroomId: classroomId1,
    subjectId: subjectId1,
    classPeriodId: classPeriodId1,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    teacherId: teacherId2,
    classroomId: classroomId2,
    subjectId: subjectId2,
    classPeriodId: classPeriodId2,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    teacherId: teacherId1,
    classroomId: classroomId2,
    subjectId: subjectId1,
    classPeriodId: classPeriodId2,
  },
];

export default scheduleEntryData;
