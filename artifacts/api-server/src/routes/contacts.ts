import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  fallbackStore,
  isDatabaseUnavailable,
  logFallbackMode,
} from "../fallback-store";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(contactsTable.createdAt);
    res.json(
      contacts.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("contacts.get", err);
      const contacts = fallbackStore.listContacts();
      return res.json(
        contacts.map((c) => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
        })),
      );
    }
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "name and message are required" });
    }
    const [contact] = await db
      .insert(contactsTable)
      .values({ name, phone: phone || null, email: email || null, message })
      .returning();
    res.status(201).json({ ...contact, createdAt: contact.createdAt.toISOString() });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("contacts.post", err);
      const { name, phone, email, message } = req.body;
      const contact = fallbackStore.createContact({
        name,
        phone: phone || null,
        email: email || null,
        message,
      });
      return res.status(201).json({ ...contact, createdAt: contact.createdAt.toISOString() });
    }
    res.status(500).json({ error: "Failed to save contact" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(contactsTable).where(eq(contactsTable.id, id));
    res.json({ success: true, message: "Contact deleted" });
  } catch (err) {
    if (isDatabaseUnavailable(err)) {
      logFallbackMode("contacts.delete", err);
      const id = parseInt(req.params.id);
      fallbackStore.deleteContact(id);
      return res.json({ success: true, message: "Contact deleted" });
    }
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

export default router;
