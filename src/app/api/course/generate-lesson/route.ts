import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain";

// Types and interfaces
export type Lesson = {
  title: string;
  topics: string;
  content: string;
};

export async function POST(req: Request) {
  // Descrtructure props from req
  const { courseTitle, lessonTitle, topics } = await req.json();

  // Prompt template variables
  const template = `Generate a lesson for a course on "{courseTitle}". The title of the lesson is "{lessonTitle}", and it should cover the following topics: "{topics}". The output should be in markdown format.`;

  const inputVariables = ["courseTitle", "lessonTitle", "topics"];

  // Instantiate PromptTemplate
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables,
  });

  // Create prompt
  const prompt = await promptTemplate.format({
    courseTitle,
    lessonTitle,
    topics,
  });

  const llm = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  llm.call(prompt).then((result) => {
    return {
      title: lessonTitle,
      topics,
      content: result,
    };
  });
}
