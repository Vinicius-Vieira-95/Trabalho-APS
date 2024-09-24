import api from "../../api";

const PostConfirmPresence = async (
  token: string,
  email: string
): Promise<{
  success: string;
}> => {
  try {
    const response = await api.post(`/events/validate/attendance/${token}`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao confirmar presença:", error);
    throw error;
  }
};

export default PostConfirmPresence;
