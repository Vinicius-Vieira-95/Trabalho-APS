import api from "../../api";
import { mockUsers } from "../../mock/mockUsers";
import { Event } from "./type"; 

const GetFinishedList = async (): Promise<Event[]> => {
  try {
    const response = await api.get(`/events/finished/user/${mockUsers[0].id}?status=FINISHED`);
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error; 
  }
};


export default GetFinishedList;
