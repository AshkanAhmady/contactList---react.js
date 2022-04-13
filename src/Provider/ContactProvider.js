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

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      let cloneContacts = [...state];
      cloneContacts = [...cloneContacts, { ...action.value, id: Date.now() }];
      return cloneContacts;
    }

    case "sort": {
      let cloneContacts = [...state];
      if (action.value === "asc") {
        return _.orderBy(cloneContacts, ["id"], ["asc"]);
      } else {
        return _.orderBy(cloneContacts, ["id"], ["desc"]);
      }
    }

    case "delete": {
      let updatedContact = state.filter((item) => item.id !== action.id);
      return _.orderBy(updatedContact, ["id"], [action.sort]);
    }

    case "update": {
      const index = state.findIndex((item) => item.id == action.id);
      let cloneContacts = [...state];
      let currentContact = { ...cloneContacts[index] };
      currentContact = action.contact;
      cloneContacts[index] = currentContact;
      return cloneContacts;
    }

    case "getDB": {
      let savedData = action.value;
      return savedData;
    }

    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // localStorage.clear();
    var storedData = JSON.parse(localStorage.getItem("DB"));
    // set Contacts
    dispatch({ type: "getDB", value: storedData });
  }, []);

  useEffect(() => {
    localStorage.setItem("DB", JSON.stringify(contacts));
  }, [contacts]);

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
