import { Router, type IRouter } from "express";
import { db, enrollmentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const enrollments = await db
      .select()
      .from(enrollmentsTable)
      .orderBy(enrollmentsTable.createdAt);
    res.json(
      enrollments.map((e) => ({
        ...e,
        createdAt: e.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, course, message } = req.body;
    if (!name || !phone || !course) {
      return res.status(400).json({ error: "name, phone, and course are required" });
    }
    const [enrollment] = await db
      .insert(enrollmentsTable)
      .values({ name, phone, email: email || null, course, message: message || null, status: "pending" })
      .returning();
    res.status(201).json({ ...enrollment, createdAt: enrollment.createdAt.toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to create enrollment" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const [updated] = await db
      .update(enrollmentsTable)
      .set({ status })
      .where(eq(enrollmentsTable.id, id))
      .returning();
    if (!updated) return res.status(404).json({ error: "Enrollment not found" });
    res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to update enrollment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.id, id));
    res.json({ success: true, message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete enrollment" });
  }
});

export default router;
