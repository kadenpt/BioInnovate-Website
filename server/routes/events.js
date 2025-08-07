import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await db.collection("events").find({}).toArray();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET single event by ID
router.get("/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const event = await db.collection("events").findOne({ _id: new ObjectId(req.params.id) });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// POST create new event
router.post("/", async (req, res) => {
  try {
    const { name, date, time, location, description } = req.body;
    
    // Validation
    if (!name || !date || !time || !location || !description) {
      return res.status(400).json({ error: "Name, date, time, location, and description are required" });
    }

    const newEvent = {
      name,
      date,
      time,
      location,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("events").insertOne(newEvent);
    res.status(201).json({ 
      message: "Event created successfully", 
      eventId: result.insertedId,
      event: { ...newEvent, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// PUT update event
router.put("/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const { name, date, time, location, description } = req.body;
    
    const updateData = {
      ...(name && { name }),
      ...(date && { date }),
      ...(time && { time }),
      ...(location && { location }),
      ...(description && { description }),
      updatedAt: new Date()
    };

    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const result = await db.collection("events").deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router; 