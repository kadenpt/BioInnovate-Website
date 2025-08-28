import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// POST /auth/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password';
    
    // Check credentials
    if (username === adminUsername && password === adminPassword) {
      res.json({ 
        success: true, 
        message: 'Login successful',
        user: { username: adminUsername }
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router; 