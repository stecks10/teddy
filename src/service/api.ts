// services/clientService.ts
import { Customer } from "@/context/ClientContext";
import axios from "axios";

const API_URL = "http://localhost:3333/clients";

export const getClients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
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
