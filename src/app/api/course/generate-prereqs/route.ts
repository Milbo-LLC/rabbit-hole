import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain";

type Topic = {
  title: string;
  description: string;
};

export type Prereq = {
  title: string;
  description: string;
  topics: Topic[];
};

export async function POST(req: Request) {
  // Descrtructure props from req
  const { title, description } = await req.json();

  // Prompt template variables
  const template = `What are the most important prerequisites for a course called "{title}" which has the following description: "{description}". Limit the number of prerequisites to the top 3. Output should be in JSON format. Each prerequisite should have a title, description, and list of topics. Each topic should have a title and description.`;

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
    return JSON.parse(result).prerequisites;
  });
}
