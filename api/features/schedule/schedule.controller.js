import asyncHandler from "express-async-handler";
import ScheduleEntry from "./scheduleEntry.model.js";
import DailyModification from "./dailyModification.model.js";
// Other imports
import "../users/user.model.js";
import "../academics/classroom.model.js";
import "../academics/academicClass.model.js";
import "../subjects/subject.model.js";
import "../academics/classPeriod.model.js";


/*  @desc Create a permanent schedule entry
    @route POST /api/schedule
    @access Private
*/

const createScheduleEntry = asyncHandler(async(req, res)=>{
  // No needs to direct input, as they are dynamic. 
  const {teacherId, classroomId, subjectId, classPeriodId} = req.body
  const entryExists = await  ScheduleEntry.findOne({classroomId, classPeriodId})
  if(entryExists){
    res.status(400)
    throw new Error('Class for this period in this classroom already exists.')
  }

  const scheduleEntry = await ScheduleEntry.create({
    teacherId, classroomId, subjectId, classPeriodId
  })

  // Populate entry for full response
  const populatedEntry = await ScheduleEntry.findById(scheduleEntry._id)
  .populate('teacherId', 'name')
  .populate('classroomId', 'name')
  .populate('subjectId', 'name')
  .populate('classPeriodId', 'name startTime endTime')


  res.status(201).json(populatedEntry)
})


/*  @desc Update a permanent schedule entry
    @route PUT /api/schedule/:id
    @access Private
*/
const updateScheduleEntry = asyncHandler(async(req, res)=>{
  const {teacherId, classroomId, subjectId, classPeriodId} = req.body
  const scheduleEntry = await ScheduleEntry.findById(req.params.id)

  if(scheduleEntry){
    scheduleEntry.teacherId = teacherId || scheduleEntry.teacherId;
    scheduleEntry.classroomId = classroomId || scheduleEntry.classroomId;
    scheduleEntry.subjectId = subjectId || scheduleEntry.subjectId;
    scheduleEntry.classPeriodId = classPeriodId || scheduleEntry.classPeriodId;
const updatedEntry = await scheduleEntry.save()
  // Populate entry for full response
  const populatedEntry = await ScheduleEntry.findById(scheduleEntry._id)
  .populate('teacherId', 'name')
  .populate('classroomId', 'name')
  .populate('subjectId', 'name')
  .populate('classPeriodId', 'name startTime endTime')
  res.status(201).json(populatedEntry)
  }
  else{
    res.status(404)
    throw new Error('Schedule entry not found.')
  }
})


/*  @desc Delete a permanent schedule entry
    @route DELETE /api/schedule/:id
    @access Private
*/
const deleteScheduleEntry = asyncHandler(async(req, res)=>{
  const scheduleEntry = await ScheduleEntry.findById(req.params.id)
  if(scheduleEntry) {
    await scheduleEntry.deleteOne()
    res.json({message: 'Schedule entry removed.'})
  }else{
    res.status(404)
    throw new Error('Schedule entry not found.')
  }
})


/* 
 @desc Get the schedule for current day.
 @route GET /api/schedule/today
 @access Private
 */

const getScheduleForToday = asyncHandler(async (req, res) => {
  // Start and end for today to query the database accurately
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Fetching base schedule and today's modifications.
  const [scheduleEntries, modifications] = await Promise.all([
    // Getting all permanent schedule and populate them
    ScheduleEntry.find({})
      .populate({
        path: "teacherId",
        select: "name", // Need only teacher's name.
      })
      .populate({
        path: "classroomId",
        select: "name academicClasses",
        populate: {
          path: "academicClasses",
          model: "AcademicClass",
        },
      })
      .populate({
        path: "subjectId",
        select: "name",
      })
      .populate({
        path: "classPeriodId",
        select: "name startTime endTime",
      }),

    // Get all modifications for today
    DailyModification.find({
      date: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    }).populate({
      path: "originalTeacherId proxyTeacherId",
      select: "name",
    }),
  ]);

  // ------------- Processing Data --------------
  // Easy lookup for modifications of schedule information
  const modificationsMap = new Map();
  modifications.forEach((mod) => {
    modificationsMap.set(mod.scheduleEntryId.toString(), mod);
  });

  // Finalizing the schedule.
  const finalSchedule = scheduleEntries.map((entry) => {
    const modification = modificationsMap.get(entry._id.toString());

    if (modification) {
        // If modifications happen, build with modified data. 
      return {
        scheduleEntryId: entry._id,
        classPeriod: entry.classPeriodId,
        classroom: entry.classroomId,
        subject: entry.subjectId,
        status: modification.status,
        teacher: modification.proxyTeacherId || modification.originalTeacherId,
        originalTeacher: modification.originalTeacherId,
        notes: modification.notes,
      };
    } else {
      // If no modification, build with normal data.
      return {
        scheduleEntryId: entry._id,
        classPeriod: entry.classPeriodId,
        classroom: entry.classroomId,
        subject: entry.subjectId,
        status: "ACTIVE",
        teacher: entry.teacherId,
        originalTeacher: null,
        notes: "",
      };
    }
  });

  res.json(finalSchedule)
});

export { getScheduleForToday, createScheduleEntry, deleteScheduleEntry, updateScheduleEntry };
