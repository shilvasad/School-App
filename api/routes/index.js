import express from "express";
import AcademicRouter from '../features/academics/academics.routes.js'
import ScheduleRouter from "../features/schedule/schedule.routes.js";
import SubjectRouter from "../features/subjects/subject.routes.js";
import UserRouter from "../features/users/user.routes.js";

const router = express.Router();
router.use('/academic', AcademicRouter)
router.use("/users", UserRouter);
router.use("/subjects", SubjectRouter);
router.use("/schedule", ScheduleRouter);

// Simple API root router for test
router.get("/", (req, res) => {
  res.send("API is running...");
});

export default router;
