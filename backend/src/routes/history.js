import express from 'express';
import Scan from '../models/scans.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/history', protect, async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json(scans);
  } catch (error) {
    console.error("History API Error:", error.message);
    res.status(500).json({ message: 'Failed to fetch scan history' });
  }
});

export default router;
