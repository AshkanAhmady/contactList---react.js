import AddContactPage from "./Pages/AddContactPage";
import ContactListPage from "./Pages/ContactListPage";
import NotFound from "./Pages/NotFound";

const routes = [
  { path: "/add-contact", component: AddContactPage },
  { path: "/", component: ContactListPage, exact: true },
  { component: NotFound },
];

export default routes;
