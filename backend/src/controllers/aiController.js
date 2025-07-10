import axios from 'axios';

export const analyzeWithMCP = async (req, res) => {
  try {
    const awsData = req.body;
    const result = await axios.post('https://threatmorph-ai-1.onrender.com/analyze', { awsData });
    res.status(200).json(result.data);
  } catch (err) {
    console.error("AI Controller Error:", err);
    res.status(500).json({ message: "AI analysis failed" });
  }
};
export const fixWithMCP = async (req, res) => {
  try {
    const { service, resource, action, description } = req.body;
    if (!service || !action || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = await axios.post('https://threatmorph-ai-1.onrender.com/generatefix', {
      service,
      resource,
      action,
      description,
    });

    res.status(200).json(result.data);
  } catch (err) {
    console.error("AI Fixes Controller Error:", err.message);
    res.status(500).json({ message: "AI fixes generation failed" });
  }
};
