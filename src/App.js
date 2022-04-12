import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Layout from "./layout/Layout";
import ContactProvider from "./Provider/ContactProvider";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />

      <Layout>
        <ContactProvider>
          <Switch>
            {routes.map((route, index) => {
              return <Route key={index} {...route} />;
            })}
          </Switch>
        </ContactProvider>
      </Layout>
    </>
  );
}

export default App;
