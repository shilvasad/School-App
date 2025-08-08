// seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import subjects from './data/subjects.js';
import classrooms from './data/classrooms.js';
import classPeriods from './data/classPeriods.js';
import academicClasses from './data/academicClasses.js';

// Import models
import User from './models/user.model.js';
import Subject from './models/subject.model.js';
import Classroom from './models/classroom.model.js';
import AcademicClass from './models/academicClass.model.js';
import ClassPeriod from './models/classPeriod.model.js';
import ScheduleEntry from './models/scheduleEntry.model.js';
import DailyModification from './models/dailyModification.model.js';

import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    console.log('Clearing existing data...');
    // Clear all existing data
    await User.deleteMany();
    await Subject.deleteMany();
    await Classroom.deleteMany();
    await ClassPeriod.deleteMany();
    await AcademicClass.deleteMany();
    await ScheduleEntry.deleteMany();
    await DailyModification.deleteMany();

    console.log('Inserting primary data...');
    // Insert non-relational data first and get the inserted documents
    const createdUsers = await User.insertMany(users);
    const createdSubjects = await Subject.insertMany(subjects);
    const createdClassrooms = await Classroom.insertMany(classrooms);
    const createdClassPeriods = await ClassPeriod.insertMany(classPeriods);
    const createdAcademicClasses = await AcademicClass.insertMany(academicClasses);

    // Get the IDs of the created documents to build relationships
    const teacherId1 = createdUsers[0]._id;
    const teacherId2 = createdUsers[1]._id;
    const classroomId1 = createdClassrooms[0]._id;
    const classroomId2 = createdClassrooms[1]._id;
    const subjectId1 = createdSubjects[0]._id;
    const subjectId2 = createdSubjects[1]._id;
    const classPeriodId1 = createdClassPeriods[0]._id;
    const classPeriodId2 = createdClassPeriods[1]._id;
    const proxyTeacherId = createdUsers[2]._id; // Assuming Admin user is the proxy in this case

    console.log('Inserting dependent data...');
    // Create new schedule entry data using the real IDs
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

    const createdScheduleEntries = await ScheduleEntry.insertMany(scheduleEntryData);

    // Create new daily modification data using the real IDs
    const dailyModificationData = [
      {
        _id: new mongoose.Types.ObjectId(),
        date: new Date('2024-10-27T08:00:00Z'),
        scheduleEntryId: createdScheduleEntries[0]._id,
        type: 'ABSENCE',
        status: 'NEEDS_PROXY',
        originalTeacherId: createdScheduleEntries[0].teacherId,
        notes: 'Teacher is out sick today.',
      },
      {
        _id: new mongoose.Types.ObjectId(),
        date: new Date('2024-10-28T08:00:00Z'),
        scheduleEntryId: createdScheduleEntries[1]._id,
        type: 'CLASS_SWAP',
        status: 'RESOLVED',
        originalTeacherId: createdScheduleEntries[1].teacherId,
        proxyTeacherId: proxyTeacherId,
        notes: 'Covered by substitute teacher.',
      },
    ];

    await DailyModification.insertMany(dailyModificationData);

    console.log('Data Imported! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log('Clearing all data...');
    await User.deleteMany();
    await Subject.deleteMany();
    await Classroom.deleteMany();
    await ClassPeriod.deleteMany();
    await AcademicClass.deleteMany();
    await ScheduleEntry.deleteMany();
    await DailyModification.deleteMany();
    console.log('Data Destroyed! ❌');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
