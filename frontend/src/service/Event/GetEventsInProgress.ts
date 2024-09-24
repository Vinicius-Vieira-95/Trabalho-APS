import api from "../../api";
import { Event } from "./type";

const GetEventsInProgress = async (): Promise<Event[]> => {
  try {
    const response = await api.get("/events/in-progress");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};

export default GetEventsInProgress;
