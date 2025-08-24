import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await db.collection('events').find({}).toArray();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await db.collection('events').findOne({ _id: new ObjectId(req.params.id) });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const { name, date, time, location, description, url } = req.body;
    
    console.log('Received event data:', req.body);
    console.log('URL field value:', url);
    
    if (!name || !date || !time || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newEvent = {
      name,
      date,
      time,
      location,
      description,
      url: url || null,
      createdAt: new Date()
    };
    
    console.log('Event object to be inserted:', newEvent);
    
    const result = await db.collection('events').insertOne(newEvent);
    console.log('Insert result:', result);
    
    // Fetch the inserted event to verify it was stored correctly
    const insertedEvent = await db.collection('events').findOne({ _id: result.insertedId });
    console.log('Inserted event from DB:', insertedEvent);
    
    res.status(201).json({ id: result.insertedId, ...newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { name, date, time, location, description, url } = req.body;
    
    if (!name || !date || !time || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const updateData = {
      name,
      date,
      time,
      location,
      description,
      url: url || null,
      updatedAt: new Date()
    };
    
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 