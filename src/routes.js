import AddContactPage from "./Pages/AddContactPage";
import ContactListPage from "./Pages/ContactListPage";
import NotFound from "./Pages/NotFound";
import EditPage from "./Pages/EditPage";

const routes = [
  { path: "/edit/:id", component: EditPage },
  { path: "/add-contact", component: AddContactPage },
  { path: "/", component: ContactListPage, exact: true },
  { component: NotFound },
];

export default routes;
