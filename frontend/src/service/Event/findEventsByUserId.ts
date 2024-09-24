import api from "../../api";
import { Event } from "./type";

const findEventsByUserId = async (id: string): Promise<Event[]> => {
  try {
    const response = await api.get(`/events/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pegar evento:", error);
    throw error;
  }
};

export default findEventsByUserId;
