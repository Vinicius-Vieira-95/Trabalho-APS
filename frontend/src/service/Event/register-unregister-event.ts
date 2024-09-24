import api from "../../api";

export const registerUnregisterEvent = async (
  eventId: string,
  userId: string
) => {
  try {
    await api.post(`/events/${eventId}/register-user/${userId}`);
  } catch (error) {
    console.error("Erro ao cadastrar/cancelar inscrição em evento:", error);
    throw error;
  }
};
