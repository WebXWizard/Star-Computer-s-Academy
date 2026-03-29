import { Router, type IRouter } from "express";
import { db, enrollmentsTable, contactsTable, coursesTable, testimonialsTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";
import {
  fallbackStore,
  isDatabaseUnavailable,
  logFallbackMode,
} from "../fallback-store";

const router: IRouter = Router();

router.get("/stats", async (_req, res) => {
  try {
    const [totalEnrollmentsRow] = await db.select({ count: count() }).from(enrollmentsTable);
    const [pendingEnrollmentsRow] = await db
      .select({ count: count() })
      .from(enrollmentsTable)
      .where(eq(enrollmentsTable.status, "pending"));
    const [confirmedEnrollmentsRow] = await db
      .select({ count: count() })
      .from(enrollmentsTable)
      .where(eq(enrollmentsTable.status, "confirmed"));
    const [totalContactsRow] = await db.select({ count: count() }).from(contactsTable);
    const [totalCoursesRow] = await db.select({ count: count() }).from(coursesTable);
    const [totalTestimonialsRow] = await db.select({ count: count() }).from(testimonialsTable);

    res.json({
      totalEnrollments: Number(totalEnrollmentsRow.count),
      pendingEnrollments: Number(pendingEnrollmentsRow.count),
      confirmedEnrollments: Number(confirmedEnrollmentsRow.count),
      totalContacts: Number(totalContactsRow.count),
      totalCourses: Number(totalCoursesRow.count),
      totalTestimonials: Number(totalTestimonialsRow.count),
    });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("admin.stats", err);
      return res.json(fallbackStore.stats());
    }
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
