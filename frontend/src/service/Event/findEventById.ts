import api from "../../api";
import { Event } from "./type";

const findEventById = async (id: string): Promise<Event> => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pegar evento:", error);
    throw error;
  }
};

export default findEventById;
