import axios from 'axios';

export const generateFix = async (req, res) => {
    // console.log(req.body);
  const { service, resource, action, description } = req.body;

  if (!service || !action || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const prompt = `
You are a DevSecOps assistant. Your task is to generate an exact Terraform or shell script that fixes the described issue in a production AWS environment. You must use the specific resource IDs, regions, ports, or IPs given. Do not include markdown, placeholders, or any explanations. Output only a valid and executable script , no markdown or anything. All values are already validated and safe to use.

Service: ${service}
Resource: ${resource || 'N/A'}
Action: ${action}
Description: ${description}


`;

  try {
    const aiRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a DevSecOps assistant.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const script = aiRes.data.choices?.[0]?.message?.content;
    if (!script) {
      throw new Error('Empty AI response');
    }

    res.json({ script: script.trim() });
  } catch (err) {
    console.error('AI Fix Generation Error:', err?.response?.data || err.message);
    res.status(500).json({ message: 'Failed to generate fix script' });
  }
};
