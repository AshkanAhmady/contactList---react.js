import _ from "lodash";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const ContactContext = createContext();
const ContactContextDispatcher = createContext();
let DB = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      let cloneContacts = [...state];
      cloneContacts = [...cloneContacts, { ...action.value, id: Date.now() }];
      DB = [...DB, { ...action.value, id: Date.now() }];
      return cloneContacts;
    }

    case "sort": {
      let cloneContacts = [...state];
      if (action.value === "asc") {
        DB = _.orderBy(DB, ["id"], ["asc"]);
        return _.orderBy(cloneContacts, ["id"], ["asc"]);
      } else {
        DB = _.orderBy(DB, ["id"], ["desc"]);
        return _.orderBy(cloneContacts, ["id"], ["desc"]);
      }
    }

    case "delete": {
      let updatedContact = state.filter((item) => item.id !== action.id);
      DB = _.orderBy(updatedContact, ["id"], [action.sort]);
      return _.orderBy(updatedContact, ["id"], [action.sort]);
    }

    case "update": {
      const index = state.findIndex((item) => item.id == action.id);
      let cloneContacts = [...state];
      let currentContact = { ...cloneContacts[index] };
      currentContact = action.contact;
      cloneContacts[index] = currentContact;
      DB = cloneContacts;
      return cloneContacts;
    }

    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(reducer, []);

  return (
    <ContactContext.Provider value={contacts}>
      <ContactContextDispatcher.Provider value={dispatch}>
        {children}
      </ContactContextDispatcher.Provider>
    </ContactContext.Provider>
  );
};

export default ContactProvider;
export const useContact = () => useContext(ContactContext);
export const useContactActions = () => useContext(ContactContextDispatcher);
