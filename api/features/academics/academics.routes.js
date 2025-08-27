import express from "express";
import AcademicClassRouter from "./academicClasses/academicClass.routes.js";
import ClassPeriodRouter from "./classPeriods/classPeriods.routes.js";
import ClassRoomRouter from "./classrooms/classroom.routes.js";

const router = express.Router();
// @router root /api/academics/~
router.use("/classrooms", ClassRoomRouter);
router.use("/class-periods", ClassPeriodRouter);
router.use("/classes", AcademicClassRouter);

export default router;
