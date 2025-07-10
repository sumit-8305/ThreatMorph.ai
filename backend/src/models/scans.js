import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  threats: [Object],
  fixes: [Object],
  awsData: Object,
  region: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Scan || mongoose.model('Scan', scanSchema);
