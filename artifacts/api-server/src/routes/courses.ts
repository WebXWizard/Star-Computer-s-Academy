import { Router, type IRouter } from "express";
import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  fallbackStore,
  isDatabaseUnavailable,
  logFallbackMode,
} from "../fallback-store.js";

const router: IRouter = Router();

const referenceCourses = [
  {
    title: "Entry Level | Basic Courses for Beginners",
    description: "BCC, DCA, ADCA, PGDCA and other beginner-friendly computer courses.",
    duration: "6-12 Months",
    fee: "Contact for fee",
    icon: "BookOpen",
    isActive: true,
  },
  {
    title: "Programming Courses for Absolute Beginners",
    description: "Python, Java, JavaScript and beginner programming fundamentals.",
    duration: "6-18 Months",
    fee: "Contact for fee",
    icon: "BookOpen",
    isActive: true,
  },
  {
    title: "Web Development Courses",
    description: "HTML, CSS, JavaScript, Express, Node, React and practical web projects.",
    duration: "3-12 Months",
    fee: "Contact for fee",
    icon: "BookOpen",
    isActive: true,
  },
  {
    title: "NIELIT Offered Courses",
    description: "BCC, O'Level, CCC and other NIELIT-focused certification courses.",
    duration: "6-12 Months",
    fee: "Contact for fee",
    icon: "BookOpen",
    isActive: true,
  },
  {
    title: "Digital Marketing & Graphic Design Courses",
    description: "Marketing, SEO, Adobe tools, animation and creative digital skills.",
    duration: "6-10 Months",
    fee: "Contact for fee",
    icon: "BookOpen",
    isActive: true,
  },
  {
    title: "Skill India Certification Courses",
    description: "Data Entry, Angular and Python Fullstack certification-oriented training.",
    duration: "3-6 Months",
    fee: "Contact for fee",
    icon: "BookOpen",
    isActive: true,
  },
];

async function listCoursesWithReferenceCatalog() {
  const courses = await db.select().from(coursesTable).orderBy(coursesTable.id);
  const existingTitles = new Set(courses.map((course) => course.title));
  const missingCourses = referenceCourses.filter(
    (course) => !existingTitles.has(course.title),
  );

  if (missingCourses.length === 0) return courses;

  await db.insert(coursesTable).values(missingCourses);
  return db.select().from(coursesTable).orderBy(coursesTable.id);
}

router.get("/", async (_req, res) => {
  try {
    const courses = await listCoursesWithReferenceCatalog();
    return res.json(
      courses.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("courses.get", err);
      const courses = fallbackStore.listCourses();
      return res.json(
        courses.map((c) => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
        })),
      );
    }
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, duration, fee, icon, isActive } = req.body;
    if (!title || !description || !duration || !fee) {
      return res.status(400).json({ error: "title, description, duration, and fee are required" });
    }
    const [course] = await db
      .insert(coursesTable)
      .values({ title, description, duration, fee, icon: icon || null, isActive: isActive !== false })
      .returning();
    return res.status(201).json({ ...course, createdAt: course.createdAt.toISOString() });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("courses.post", err);
      const { title, description, duration, fee, icon, isActive } = req.body;
      const course = fallbackStore.createCourse({
        title,
        description,
        duration,
        fee,
        icon: icon || null,
        isActive: isActive !== false,
      });
      return res.status(201).json({ ...course, createdAt: course.createdAt.toISOString() });
    }
    return res.status(500).json({ error: "Failed to create course" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, duration, fee, icon, isActive } = req.body;
    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (duration !== undefined) updates.duration = duration;
    if (fee !== undefined) updates.fee = fee;
    if (icon !== undefined) updates.icon = icon;
    if (isActive !== undefined) updates.isActive = isActive;

    const [updated] = await db
      .update(coursesTable)
      .set(updates)
      .where(eq(coursesTable.id, id))
      .returning();
    if (!updated) return res.status(404).json({ error: "Course not found" });
    return res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("courses.patch", err);
      const id = parseInt(req.params.id);
      const { title, description, duration, fee, icon, isActive } = req.body;
      const updated = fallbackStore.updateCourse(id, {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(duration !== undefined ? { duration } : {}),
        ...(fee !== undefined ? { fee } : {}),
        ...(icon !== undefined ? { icon } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      });
      if (!updated) return res.status(404).json({ error: "Course not found" });
      return res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
    }
    return res.status(500).json({ error: "Failed to update course" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(coursesTable).where(eq(coursesTable.id, id));
    return res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("courses.delete", err);
      const id = parseInt(req.params.id);
      fallbackStore.deleteCourse(id);
      return res.json({ success: true, message: "Course deleted" });
    }
    return res.status(500).json({ error: "Failed to delete course" });
  }
});

export default router;
