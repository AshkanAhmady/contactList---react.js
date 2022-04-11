import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/contacts/";

export function deleteRequest(id) {
  return axios.delete(`${id}`);
}

export function getRequest() {
  return axios.get();
}

export function addRequest(contact) {
  return axios.post("", contact);
}
