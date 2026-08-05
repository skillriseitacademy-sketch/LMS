import dotenv from "dotenv";
dotenv.config();

async function testOpenRouter() {
  console.log("Testing OpenRouter Perplexity model...");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "perplexity/llama-3.1-sonar-large-128k-online",
      messages: [
        {
          role: "user",
          content: "Find 2 live software engineer jobs on linkedin. Return the links.",
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenRouter Error:", response.status, await response.text());
  } else {
    const data = await response.json();
    console.log("OpenRouter Success:", data.choices[0].message.content);
  }
}

async function testOpenAI() {
  console.log("\nTesting OpenAI GPT-4o model...");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say hello!" }],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI Error:", response.status, await response.text());
  } else {
    const data = await response.json();
    console.log("OpenAI Success:", data.choices[0].message.content);
  }
}

async function main() {
  await testOpenRouter();
  await testOpenAI();
}

main();
