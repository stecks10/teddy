import axios from "axios";

const API_URL = "http://localhost:3333/clients";

export const getClients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes", error);
    throw error;
  }
};
export const createClient = async (clientData: {
  name: string;
  salary: number;
  companyValue: number;
  isFavorite: boolean;
}) => {
  try {
    const response = await axios.post(API_URL, clientData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente", error);
    throw error;
  }
};

export const updateClient = async (
  id: string,
  clientData: {
    name: string;
    salary: number;
    companyValue: number;
    isFavorite: boolean;
  }
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cliente", error);
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar cliente", error);
    throw error;
  }
};
