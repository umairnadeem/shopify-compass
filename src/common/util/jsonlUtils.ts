import axios from "axios";

export const jsonlToJson = async (jsonlUrl: string): Promise<any> => {
  if (jsonlUrl) {
    const { data } = await axios.get("/jsonl", { params: { jsonlUrl } });
    return data;
  }
};
