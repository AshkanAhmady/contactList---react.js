import { createStore } from "redux";
import contactReducer from "./contact/contactReducer";

const store = createStore(contactReducer);

export default store;
