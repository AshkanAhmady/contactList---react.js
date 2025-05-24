import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import contactReducer from "../features/contact/contactSlice";
import { RootState } from "../features/store";

type CustomRenderOptions = {
  preloadedState?: Partial<RootState>;
  route?: string;
  path?: string;
  elementPath?: ReactElement;
} & Omit<RenderOptions, "wrapper">;

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState,
    route = "/",
    path,
    elementPath,
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const store = configureStore({
    reducer: {
      contacts: contactReducer,
    },
    preloadedState,
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <ToastContainer />
        {path && elementPath ? (
          <Routes>
            <Route path={path} element={elementPath} />
            <Route path="*" element={children} />
          </Routes>
        ) : (
          children
        )}
      </MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";