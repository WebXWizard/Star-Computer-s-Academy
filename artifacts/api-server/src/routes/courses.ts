import { Router, type IRouter } from "express";
import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  fallbackStore,
  isDatabaseUnavailable,
  logFallbackMode,
} from "../fallback-store";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const courses = await db.select().from(coursesTable).orderBy(coursesTable.id);
    res.json(
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
    res.status(500).json({ error: "Failed to fetch courses" });
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
    res.status(201).json({ ...course, createdAt: course.createdAt.toISOString() });
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
    res.status(500).json({ error: "Failed to create course" });
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
    res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
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
    res.status(500).json({ error: "Failed to update course" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(coursesTable).where(eq(coursesTable.id, id));
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("courses.delete", err);
      const id = parseInt(req.params.id);
      fallbackStore.deleteCourse(id);
      return res.json({ success: true, message: "Course deleted" });
    }
    res.status(500).json({ error: "Failed to delete course" });
  }
});

export default router;
