import api from "../../api";
import { User } from "../../models/interface";

const GetPresenceList = async (
  eventId: string
): Promise<{ userId: string; attended: boolean; user: User }[]> => {
  try {
    const response = await api.get(`/events/presence-list/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};

export default GetPresenceList;
