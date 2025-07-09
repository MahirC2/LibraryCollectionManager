import axios from "axios";

const API_URL = "https://api-f24r2vscaa-uc.a.run.app/api/books";

export const bookService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
