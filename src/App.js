import ContactListApp from "./Container/ContactListApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <ContactListApp />
    </>
  );
}

export default App;
