import asyncHandler from 'express-async-handler'
import ScheduleEntry from '../models/scheduleEntry.model.js'
import DailyModification from '../models/dailyModification.model.js'

// @desc Get the schedule for current day. 
// @route GET /api/schedule/today
// @access Private (will be later)

const getScheduleForToday = asyncHandler(async(req, res)=>{
    res.json({
        message: 'Controller is working.'
    })

    /* 
    ---------- LOGIC TO BE ADDED LATER ------------
    1. Get today's date. 
    2. Fetch all permannet schedule entries from `ScheduleEntry` model.
    3. Fet ch all modifications for today from ``DailyModification` model. 
    4. Combine them into the final JSON structure.
    5. Send the final JSON back. 
    */
})

export {getScheduleForToday}