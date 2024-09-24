import api from "../../api";

const deleteEvent = async (id: string): Promise<void> => {
  try {
    await api.delete(`/events/${id}`);
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    throw error;
  }
};

export default deleteEvent;
