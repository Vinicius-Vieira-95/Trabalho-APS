import api from "../../api";
import { Event } from "./type";

const CreateEvent = async (
  data: Omit<Event, "id" | "status" | "createdAt" | "updatedAt">
): Promise<Event> => {
  try {
    const response = await api.post("/events/open", {
      data,
    });
    console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    throw error;
  }
};

export default CreateEvent;
