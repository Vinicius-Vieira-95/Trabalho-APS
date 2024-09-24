import api from "../../api";

const PostFinishCourse = async (
  eventId: string
): Promise<{
  token: string;
}> => {
  try {
    const response = await api.post(`/events/finish/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao finalizar eventos:", error);
    throw error;
  }
};

export default PostFinishCourse;
