import { ADD, SORT, DELETE, UPDATE } from "./contactType";

export function addContact(contact) {
  return {
    type: ADD,
    payload: contact,
  };
}

export function sortContact(sortValue) {
  return {
    type: SORT,
    payload: sortValue,
  };
}

export function deleteContact(id, sort) {
  return {
    type: DELETE,
    id: id,
    sort: sort,
  };
}

export function updateContact(id, contact) {
  return {
    type: UPDATE,
    id: id,
    contact: contact,
  };
}
