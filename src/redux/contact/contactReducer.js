import { ADD, SORT, DELETE, UPDATE } from "./contactType";
import _ from "lodash";
const initialState = [];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      let cloneContacts = [...state];
      cloneContacts = [...cloneContacts, { ...action.payload, id: Date.now() }];
      return cloneContacts;
    }

    case SORT: {
      let cloneContacts = [...state];
      if (action.payload === "asc") {
        return _.orderBy(cloneContacts, ["id"], ["asc"]);
      } else {
        return _.orderBy(cloneContacts, ["id"], ["desc"]);
      }
    }

    case DELETE: {
      let updatedContact = state.filter((item) => item.id !== action.id);
      return _.orderBy(updatedContact, ["id"], [action.sort]);
    }

    case UPDATE: {
      const index = state.findIndex((item) => item.id == action.id);
      let cloneContacts = [...state];
      let currentContact = { ...cloneContacts[index] };
      currentContact = action.contact;
      cloneContacts[index] = currentContact;
      return cloneContacts;
    }

    default:
      return state;
  }
};

export default contactReducer;
