import axios from "axios"

export const jsonlToJson = async (jsonlUrl: string): Promise<void> => {
  const result = await axios.get("/jsonl", { params: { jsonlUrl } });
  console.log("bruh", result);
}