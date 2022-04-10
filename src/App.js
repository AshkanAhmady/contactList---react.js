import ContactApp from "./Container/ContactApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <ContactApp />
    </>
  );
}

export default App;
