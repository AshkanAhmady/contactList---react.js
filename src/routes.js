import AddContactPage from "./Pages/AddContactPage";
import ContactListPage from "./Pages/ContactListPage";
import NotFound from "./Pages/NotFound";
import SingleContactPage from "./Pages/SingleContactPage";

const routes = [
  { path: "/contact/:id", component: SingleContactPage },
  { path: "/add-contact", component: AddContactPage },
  { path: "/", component: ContactListPage, exact: true },
  { component: NotFound },
];

export default routes;
