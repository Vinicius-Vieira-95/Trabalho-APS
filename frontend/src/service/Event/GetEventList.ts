import api from "../../api";
import { Event } from "./type"; 

const GetEventList = async (): Promise<Event[]> => {
  try {
    const response = await api.get('/events/open');
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error; 
  }
};


export default GetEventList;
