require('dotenv').config();

const OpenAI = require('openai')

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY  // Ensure you have set this environment variable
    });
  
async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: "The quick brown fox jumped over the lazy dog",
  });

  console.log(embedding);
}

main();