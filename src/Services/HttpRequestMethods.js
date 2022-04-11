import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/contacts/";

export const deleteRequest = (id) => axios.delete(`${id}`);
export const getRequest = () => axios.get();
export const addRequest = (contact) => axios.post("", contact);
