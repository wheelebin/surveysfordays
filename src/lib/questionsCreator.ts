import questionApi from "@/api/question";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = async (
  numberOfQuestions: number,
  description: string,
  tags: string[]
) => {
  const prompt = `Write ${numberOfQuestions} questions for a customer research survey for the following business:
Business: ${description}
I'm looking to gain the following insights about my business:
insights: ${tags.join(",")}.
Also create answer options.
Output as json in a way that makes it easy for me to parse in javascript.
See bellow for an example:
[
    {
    "question": "How comfortable is the dog house you purchased from us?",
    "options": ["Very Comfortable", "Somewhat Comfortable", "Not Very Comfortable", "Not Comfortable at All"]
    },
    {
    "question": "What color dog house did you purchase from us?",
    "options": ["White", "Black", "Gray", "Red", "Blue", "Green", "Other"]
    },
    {
    "question": "How would you rate your experience shopping on our web shop?",
    "options": ["Excellent", "Good", "Average", "Poor", "Very Poor"]
    }
]

Output:
`;

  console.log("Prompt: ", prompt);

  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 600,
    temperature: 0.7,
  });
};

export const runPrompt = async (
  numberOfQuestions: number,
  description: string,
  tags: string[]
) => {
  const result = await generatePrompt(numberOfQuestions, description, tags);
  const usage = result.data.usage;

  const choice = result.data.choices[0];

  if (!choice || !choice.text) {
    return undefined;
  }

  const response = JSON.parse(choice.text.replace("\n", ""));

  console.log("Response: ", response);

  return response as { question: string; options: string[] }[];
};
