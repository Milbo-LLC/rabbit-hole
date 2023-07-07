import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

type Question = {
  question: string;
  choices: string[];
  answer: string;
};

export type Quiz = {
  questions: Question[];
};

export async function POST(req: Request) {
  // Descrtructure props from req
  const { title, description, topics } = await req.json();

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      questions: z.array(
        z.object({
          question: z.string(),
          choices: z.array(z.string()),
          answer: z.string(),
        })
      ),
    })
  );

  // Create formatInstructions
  const formatInstructions = parser.getFormatInstructions();

  // Prompt template variables
  const template = `Generate a multiple choice quiz for a unit in a course in JSON format. The unit is called "{title}", has the following description: "{description}", and covers the following topics: {topics}. {format_instructions}.`;

  const inputVariables = ["title", "description", "topics"];
  const partialVariables = { format_instructions: formatInstructions };

  // Instantiate PromptTemplate
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables,
    partialVariables,
  });

  // Create prompt
  const prompt = await promptTemplate.format({ title, description, topics });

  const llm = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  llm.call(prompt).then(async (result) => {
    return await parser.parse(result);
  });
}
