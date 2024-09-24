import api from "../../api";

const PostTokenSignature = async (
  eventId: string,
  timeQRCodeOpened: number
): Promise<{
  token: string;
}> => {
  try {
    const response = await api.post(
      `/events/generate/token/attendance-signature/${eventId}`,
      {
        timeToExpire: timeQRCodeOpened,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar token:", error);
    throw error;
  }
};

export default PostTokenSignature;
