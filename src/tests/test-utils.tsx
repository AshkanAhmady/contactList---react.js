import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice";
import { RootState } from "../features/store";
import { MemoryRouter } from "react-router-dom";

type CustomRenderOptions = Omit<RenderOptions, "wrapper">;

const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: CustomRenderOptions & { preloadedState?: Partial<RootState> } = {}
) => {
  const store = configureStore({
    reducer: {
      contacts: contactReducer,
    },
    preloadedState,
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { renderWithProviders };
