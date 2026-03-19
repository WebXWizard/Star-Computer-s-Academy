import { Router, type IRouter } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const testimonials = await db
      .select()
      .from(testimonialsTable)
      .orderBy(testimonialsTable.id);
    res.json(
      testimonials.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { studentName, course, review, rating, isActive } = req.body;
    if (!studentName || !course || !review || rating === undefined) {
      return res.status(400).json({ error: "studentName, course, review, and rating are required" });
    }
    const [testimonial] = await db
      .insert(testimonialsTable)
      .values({ studentName, course, review, rating, isActive: isActive !== false })
      .returning();
    res.status(201).json({ ...testimonial, createdAt: testimonial.createdAt.toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to create testimonial" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

export default router;
