import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import enrollmentsRouter from "./enrollments.js";
import contactsRouter from "./contacts.js";
import coursesRouter from "./courses.js";
import testimonialsRouter from "./testimonials.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/enrollments", enrollmentsRouter);
router.use("/contacts", contactsRouter);
router.use("/courses", coursesRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/admin", adminRouter);

export default router;
