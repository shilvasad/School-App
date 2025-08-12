import asyncHandler from "express-async-handler";
import ScheduleEntry from "../../models/scheduleEntry.model.js";
import DailyModification from "../../models/dailyModification.model.js";
// Other imports
import "../models/user.model.js";
import "../../models/classroom.model.js";
import "../../models/academicClass.model.js";
import "../models/subject.model.js";
import "../../models/classPeriod.model.js";

// @desc Get the schedule for current day.
// @route GET /api/schedule/today
// @access Private (will be later)

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

export { getScheduleForToday };
