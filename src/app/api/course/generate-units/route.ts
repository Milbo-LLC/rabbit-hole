import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain";

export type Lesson = {
  title: string;
  topics: string;
  content: string;
};

type Question = {
  question: string;
  choices: string[];
  answer: string;
};

type Quiz = {
  questions: Question[];
};

export type Unit = {
  title: string;
  description: string;
  lessons: Lesson[];
  quizzes: Quiz[];
};

export async function POST(req: Request) {
  // Descrtructure props from req
  const { title, description } = await req.json();

  // Prompt template variables
  const template = `What are the most important units to cover for a course called "{title}" which has the following description: "{description}". Each unit should contain a minimum of 3 lessons. Output should be an object with a key of units and value that is an array of units. Output should be in JSON format. Each unit should include a title, description, and a list of lessons. Each lesson should include a title and a list of topics. Each topic should be a string.`;

  const inputVariables = ["title", "description"];

  // Instantiate PromptTemplate
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables,
  });

  // Create prompt
  const prompt = await promptTemplate.format({ title, description });

  const llm = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  llm.call(prompt).then((result) => {
    return JSON.parse(result).units;
  });
}
