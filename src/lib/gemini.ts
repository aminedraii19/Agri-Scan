import { GoogleGenAI, Type } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export async function scanPlant(imageBase64: string) {
  const ai = getGenAI();
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze this plant leaf image for any diseases or issues. 
  Provide a JSON response with the following structure:
  {
    "disease": "Name of disease or 'Healthy'",
    "confidence": number between 0 and 1,
    "recommendations": ["list", "of", "actions"],
    "severity": "Low", "Medium", or "High"
  }`;

  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: imageBase64,
    },
  };

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                disease: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                recommendations: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                severity: { 
                    type: Type.STRING,
                    enum: ["Low", "Medium", "High"]
                }
            },
            required: ["disease", "confidence", "recommendations", "severity"]
        }
    }
  });

  return JSON.parse(response.text || '{}');
}
