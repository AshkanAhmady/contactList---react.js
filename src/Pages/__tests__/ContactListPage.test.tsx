import { screen } from "@testing-library/react";
import ContactListPage from "../ContactListPage";
import { renderWithProviders } from "../../tests/test-utils";
import { ContactType } from "../../types";

// 1)تست رندر شدن اولیه
test("renders contractListPage", () => {
  renderWithProviders(<ContactListPage />);
  const spanTag = screen.getByText("Contacts list");
  expect(spanTag).toBeInTheDocument();
});
// 2تست تعداد آیتم های اد شده توسط کاربر به لیست مخاطبین

test("renders initial contacts", () => {
  const fakeContacts: ContactType[] = [
    {
      name: "hamideh",
      email: "email",
      gender: "female",
      phone: 12456879,
      emailPhoneShow: "email",
      id: 1,
    },
    {
      name: "ashkan",
      email: "email",
      gender: "female",
      phone: 12456879,
      emailPhoneShow: "email",
      id: 2,
    },
    {
      name: "samira",
      email: "email",
      gender: "female",
      phone: 12456879,
      emailPhoneShow: "email",
      id: 3,
    },
  ];

  renderWithProviders(<ContactListPage />, {
    preloadedState: {
      contacts: { contacts: fakeContacts },
    },
  });

  expect(screen.getByText("ashkan")).toBeInTheDocument();
  expect(screen.getByText("hamideh")).toBeInTheDocument();
});
//  تست خالی بودن لیست و نمایش پیام خالی
test("contact list is empty", () => {
  const fakeContacts: ContactType[] = [];
  renderWithProviders(<ContactListPage />, {
    preloadedState: {
      contacts: { contacts: fakeContacts },
    },
  });
  expect(screen.getByText("The contact list is empty !")).toBeInTheDocument();
});
