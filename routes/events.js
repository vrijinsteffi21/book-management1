const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET all events or filter by type
router.get("/", async (req, res) => {
  try {
    const type = req.query.type;
    const query = type ? { type } : {};
    const events = await Event.find(query);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST create new event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: "Failed to create event" });
  }
  
});

// PUT assign type to event
router.put("/:id/type", async (req, res) => {
  try {
    const { type } = req.body;
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { type },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update event type" });
  }
});

module.exports = router;
