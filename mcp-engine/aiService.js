import axios from 'axios';

const sanitizeData = (data) => {
  const seen = new WeakSet();

  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }

    if (typeof value === 'function') return undefined;
    if (value instanceof Buffer) return undefined;
    if (value?.constructor?.name === 'Socket') return undefined;
    if (value?.constructor?.name === 'HTTPParser') return undefined;

    return value;
  }));
};

export const analyzeThreats = async (awsData) => {
  console.log("mcp-started-thinking");

  const cleanData = sanitizeData(awsData);
  const prompt = `
You are a cloud security expert. Given the following AWS configuration, return ONLY a valid JSON object with threats and fixes. Do not include any explanation, markdown, or text outside the JSON object.

Required format (ONLY output this JSON structure):
{
  "threats": [
    {
      "service": "string",
      "resource": "string",
      "issue": "string",
      "severity": "low|medium|high"
    }
  ],
  "fixes": [
    {
      "service": "string",
      "resource": "string",
      "action": "string",
      "description": "string"
    }
  ]
}

AWS Configuration:
${JSON.stringify(cleanData, null, 2)}
`;

  try {
    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a cloud security expert. Respond ONLY with valid JSON in the exact specified format. Do not include any explanations, markdown, or text outside the JSON object.'
          },
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

    const reply = res.data.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("No response from AI");
    }

    // console.log("Raw AI response:", reply);
    // console.log("Type of reply:", typeof reply);
    // console.log("Pre-parse content:", JSON.stringify(reply));
    // return JSON.stringify(reply);
    // const response = extractJSONFromText(reply);
    try {
      const parsed = typeof reply === 'string' ? JSON.parse(reply) : reply;

      if (!parsed.threats || !parsed.fixes) {
        throw new Error("Invalid response structure");
      }

      return parsed;
    } catch (parseError) {
      console.error("Parsing failed:", parseError);
      throw new Error(
        "Failed to parse AI response" +
        (process.env.NODE_ENV === 'development' ? `: ${reply}` : '')
      );
    }

  } catch (err) {
    console.error("Analysis failed:", {
      message: err.message,
      stack: err.stack,
      response: err.response?.data
    });

    throw new Error(
      (err.message || "Analysis failed") +
      (process.env.NODE_ENV === 'development' ? `: ${err.stack}` : '')
    );
  }
};