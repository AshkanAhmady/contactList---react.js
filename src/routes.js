import AddContact from "./Pages/AddContact";
import HomePage from "./Pages/HomePage";

const routes = [
  { path: "/", component: HomePage, exact: true },
  { path: "/add-contact", component: AddContact },
];

export default routes;
