import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />

      <Layout>
        <Switch>
          {routes.map((route, index) => {
            return <Route key={index} {...route} />;
          })}
        </Switch>
      </Layout>
    </>
  );
}

export default App;
