import prompts from "../prompts.json" assert { type: "json" };
import { generateResponse } from "../openAIResponse.js";

export const summarizeJDLLM = async (jobObj) => {
  const template = prompts["job_summary"].prompt;
  const jobObjString = JSON.stringify(jobObj);
  const customizedPrompt = template.replace(/{jobObject}/g, jobObjString);
  const response = await generateResponse(customizedPrompt);
  return response;
};
