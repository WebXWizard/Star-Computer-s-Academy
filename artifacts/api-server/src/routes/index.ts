import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enrollmentsRouter from "./enrollments";
import contactsRouter from "./contacts";
import coursesRouter from "./courses";
import testimonialsRouter from "./testimonials";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/enrollments", enrollmentsRouter);
router.use("/contacts", contactsRouter);
router.use("/courses", coursesRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/admin", adminRouter);

export default router;
