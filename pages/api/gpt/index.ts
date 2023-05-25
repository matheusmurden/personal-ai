import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
) {

  const AUTH_KEY = req?.headers?.authorization?.replace?.('Bearer ', '')
  const prompt = req?.query?.prompt;

  if(AUTH_KEY !== process.env.AUTH_KEY) {
    res.status(403)
    return
  }

  const configuration = new Configuration({
      organization: process.env.OPENAI_ORG_ID,
      apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2000
    });
    res.status(200).json(completion.data.choices[0].text)
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }

  return
}
