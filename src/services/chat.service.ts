import axios from "axios";

export const chatService = async ({ input, chatbotName }: { input: string, chatbotName: string }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC__API_QNA}/query?query=${encodeURIComponent(input)}&collection_name=${chatbotName}`);
  return response.data.response;
}
