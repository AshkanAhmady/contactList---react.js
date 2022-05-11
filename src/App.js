import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />

      <Layout>
        <Provider store={store}>
          <Routes>
            {routes.map((route, index) => {
              return <Route key={index} {...route} />;
            })}
          </Routes>
        </Provider>
      </Layout>
    </>
  );
}

export default App;
