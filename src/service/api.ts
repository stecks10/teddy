import { Customer } from "@/context/ClientContext";
import axios from "axios";

const API_URL = `${process.env.BASE_URL}/clients`;

export const getClients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

export const createClient = async (clientData: Customer) => {
  const response = await axios.post(API_URL, clientData);
  return response.data;
};

export const updateClient = async (id: string, clientData: Customer) => {
  const response = await axios.put(`${API_URL}/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
