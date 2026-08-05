import dotenv from "dotenv";
dotenv.config();

async function main() {
  const role = "Frontend Developer";
  const prompt = `Find 5 live, real job openings on the internet for this role: "${role}". 
Ensure the 'link' is a valid URL to the job posting. Include top tech companies if possible.
Output JSON matching exactly this schema:
{
  "jobs": [
    {
      "title": "Job title",
      "company": "Company name",
      "location": "Job location (e.g., Remote, Bangalore, etc.)",
      "salary": "Salary or LPA, if specified (or null)",
      "experience": "Required experience (or null)",
      "link": "A valid URL link to apply for the job"
    }
  ]
}`;

  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  console.log("Using API key:", apiKey ? "Found" : "Missing");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    console.error(`Gemini generation failed:`, response.status, response.statusText);
    console.error(await response.text());
    return;
  }

  const result = await response.json();
  const text = result.candidates[0].content.parts[0].text;
  console.log("Raw output:", text);

  const sanitizedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  const object = JSON.parse(sanitizedText);

  console.log("Parsed Object:", object);
}
main();
