import express from "express"
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js';
import scanRoutes from './routes/scan.js';
import authRoutes from "./routes/auth.js";
import aiRoutes from './routes/aiRoutes.js';
import historyRoutes from './routes/history.js';
import fixRoutes from "./routes/fixRoute.js";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/scan', scanRoutes);
app.use("/api", fixRoutes);
app.use("/api/auth", authRoutes);
app.use('/api', aiRoutes);
app.use('/api', historyRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('API Running'));
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});