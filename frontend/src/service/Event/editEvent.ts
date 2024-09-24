import api from "../../api";
import { Event } from "./type";

const editEvent = async (
  id: string,
  data: Omit<Event, "id" | "status" | "createdAt" | "updatedAt" | "usersList">
): Promise<Event> => {
  try {
    const response = await api.patch(`/events/${id}`, {
      ...data,
    });
    console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar evento:", error);
    throw error;
  }
};

export default editEvent;
