import mongoose from 'mongoose';
import scheduleEntryData from './scheduleEntryData.js'; // Import the schedule entries for referencing

// Create a placeholder for a proxy teacher
const proxyTeacherId = new mongoose.Types.ObjectId();

const dailyModificationData = [
  {
    _id: new mongoose.Types.ObjectId(),
    date: new Date('2024-10-27T08:00:00Z'),
    scheduleEntryId: scheduleEntryData[0]._id, // Reference the first schedule entry
    type: 'ABSENCE',
    status: 'NEEDS_PROXY',
    originalTeacherId: scheduleEntryData[0].teacherId,
    notes: 'Teacher is out sick today.',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    date: new Date('2024-10-28T08:00:00Z'),
    scheduleEntryId: scheduleEntryData[1]._id, // Reference the second schedule entry
    type: 'CLASS_SWAP',
    status: 'RESOLVED',
    originalTeacherId: scheduleEntryData[1].teacherId,
    proxyTeacherId: proxyTeacherId,
    notes: 'Covered by substitute teacher.',
  },
];

export default dailyModificationData;
