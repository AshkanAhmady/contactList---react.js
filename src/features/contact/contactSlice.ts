import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { ContactType } from "../../types";

type InitialStateType = {
  contacts: ContactType[]
}

const initialState: InitialStateType = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push({ ...action.payload, id: Date.now() });
    },
    sortContact: (state, action) => {
      if (action.payload === "asc") {
        state.contacts = _.orderBy(state.contacts, ["id"], ["asc"]);
      } else {
        state.contacts = _.orderBy(state.contacts, ["id"], ["desc"]);
      }
    },
    deleteContact: (state, action) => {
      let updatedContact = state.contacts.filter(
        (item) => item.id !== action.payload.id
      );
      state.contacts = _.orderBy(updatedContact, ["id"], [action.payload.sort]);
    },
    updateContact: (state, action) => {
      const index = state.contacts.findIndex(
        (item) => item.id === action.payload.id
      );
      let currentContact = { ...state.contacts[index] };
      currentContact = action.payload.edit;
      state.contacts[index] = currentContact;
    },
  },
});
// actions
export const { addContact, deleteContact, sortContact, updateContact } =
  contactSlice.actions;
// reducer
export default contactSlice.reducer;
