import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const router = express.Router();

// Get all emails
router.get('/', async (req, res) => {
  try {
    const emails = await db.collection('emails').find({}).toArray();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get email by ID
router.get('/:id', async (req, res) => {
  try {
    const email = await db.collection('emails').findOne({ _id: new ObjectId(req.params.id) });
    if (email) {
      res.json(email);
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new email subscription
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if email already exists
    const existingEmail = await db.collection('emails').findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    
    const newEmail = {
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      isActive: true
    };
    
    const result = await db.collection('emails').insertOne(newEmail);
    res.status(201).json({ 
      message: 'Successfully subscribed to mailing list',
      id: result.insertedId, 
      ...newEmail 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update email subscription status
router.put('/:id', async (req, res) => {
  try {
    const { isActive } = req.body;
    
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ error: 'isActive must be a boolean' });
    }
    
    const result = await db.collection('emails').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { isActive, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }
    
    res.json({ message: 'Email subscription updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete email subscription
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.collection('emails').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }
    
    res.json({ message: 'Email subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 