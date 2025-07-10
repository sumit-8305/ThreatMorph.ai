import express from 'express';
import { analyzeWithMCP , fixWithMCP } from '../controllers/aiController.js';

const router = express.Router();
router.post('/analyze', analyzeWithMCP);
router.post('/generatefix',fixWithMCP);

export default router;
