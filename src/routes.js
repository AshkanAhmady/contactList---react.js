import AddContactPage from "./Pages/AddContactPage";
import ContactListPage from "./Pages/ContactListPage";
import NotFound from "./Pages/NotFound";
import EditPage from "./Pages/EditPage";

const routes = [
  { path: "/edit/:id", element: <EditPage /> },
  { path: "/add-contact", element: <AddContactPage /> },
  { path: "/", element: <ContactListPage /> },
  { component: <NotFound /> },
];

export default routes;
