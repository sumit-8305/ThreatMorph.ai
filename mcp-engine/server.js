import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeThreats } from './aiService.js';
import { generateFix } from './aiFixes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
  try {
    const result = await analyzeThreats(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/generatefix', generateFix);


app.listen(process.env.PORT || 8000, () => {
  console.log('🧠 MCP AI engine running on port 8000');
});
