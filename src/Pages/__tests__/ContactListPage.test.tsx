import { fireEvent, render, screen } from "@testing-library/react";
import ContactListPage from "../ContactListPage";
import { renderWithProviders } from "../../tests/test-utils";
import { ContactType } from "../../types";
import userEvent from "@testing-library/user-event";
import EditPage from "../EditPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// 1)تست رندر شدن اولیه
test("renders contractListPage", () => {
  renderWithProviders(<ContactListPage />);
  const spanTag = screen.getByText("Contacts list");
  expect(spanTag).toBeInTheDocument();
});
// 2تست تعداد آیتم های اد شده توسط کاربر به لیست مخاطبین

test("length of contacts", () => {
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

  // expect(screen.getByText("ashkan")).toBeInTheDocument();
  // expect(screen.getByText("hamideh")).toBeInTheDocument();
  // expect(screen.getByText("samira")).toBeInTheDocument();
  const items = screen.getAllByTestId("single_contact");
  expect(items).toHaveLength(3);
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
// نمایش مخاطب جستجو شده
test("show searched contact in list", () => {
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
  const input = screen.getByPlaceholderText("Search...");
  fireEvent.change(input, { target: { value: "hamideh" } });
  expect(screen.getByText("hamideh")).toBeInTheDocument();
  expect(screen.queryByText("ashkan")).not.toBeInTheDocument();
  expect(screen.queryByText("samira")).not.toBeInTheDocument();
});
// تست عدم وجود مخاطب
test("contract not found", () => {
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
  const input = screen.getByPlaceholderText("Search...");
  fireEvent.change(input, { target: { value: "test" } });
  expect(screen.queryByText("hamideh")).not.toBeInTheDocument();
  expect(screen.queryByText("ashkan")).not.toBeInTheDocument();
  expect(screen.queryByText("samira")).not.toBeInTheDocument();
  expect(
    screen.getByText("Searched Contact Dosen`t Exists !")
  ).toBeInTheDocument();
});
// تست حذف شدن مخاطب
test("delete one contacts", async () => {
  const user = userEvent.setup();
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
  ];
  renderWithProviders(<ContactListPage />, {
    preloadedState: {
      contacts: { contacts: fakeContacts },
    },
  });
  expect(screen.getByText("hamideh")).toBeInTheDocument();
  const deleteIcon = screen.queryAllByTestId("delete-icon");
  await user.click(deleteIcon[0]);
  expect(screen.queryByText("hamideh")).not.toBeInTheDocument();
});

test("should navigate to edit page when route is /edit/:id", async () => {
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
  ];

  renderWithProviders(<></>, {
    route: "/edit/1",
    path: "/edit/:id",
    elementPath: <EditPage />,
    preloadedState: {
      contacts: { contacts: fakeContacts },
    },
  });
  expect(await screen.findByText(/Update.*hamideh/i)).toBeInTheDocument();
  expect(screen.getByTestId("update-rout")).toBeInTheDocument();
});

// وقتی کاربر کلیک کرد وارد صفحه میشیم یا نه
test("the edit page should load correctly when user click", async () => {
  const user = userEvent.setup();
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
  ];
  renderWithProviders(
    <Routes>
      <Route path="/" element={<ContactListPage />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>,
    {
      route: "/",
      preloadedState: {
        contacts: { contacts: fakeContacts },
      },
    }
  );

  const editButtons = screen.getAllByRole("link", { name: /Edit Contact/i });
  await user.click(editButtons[0]);

  // بین تمام مچر ها این بهتره چون چندجا داخل کامپوننت ادیت چندجا تکست آپدیت داریم
  expect(
    await screen.findByRole("button", { name: /update/i })
  ).toBeInTheDocument();
});
////////////////////////////////////////////
//  گام‌های تست ویرایش
// رندر لیست مخاطبین.

// کلیک روی آیکن ویرایش.

// لود شدن صفحه ویرایش (EditPage).

// تغییر مقادیر فرم (مثل name و phone).

// کلیک روی دکمه "Update".

// بررسی پیام موفقیت.

// بررسی ریدایرکت به صفحه لیست.

// بررسی اینکه اطلاعات مخاطب در لیست به‌روز شده.
////////////////////////////////////////////////////////
test("edit user and rediredt to main page", async () => {
  const user = userEvent.setup();
  const fakeContacts: ContactType[] = [
    {
      id: 1,
      name: "hamideh",
      email: "hamideh@example.com",
      gender: "female",
      phone: 91234567890,
      emailPhoneShow: "email",
    },
    {
      id: 2,
      name: "ashkan",
      email: "ashkan@example.com",
      gender: "male",
      phone: 92345678901,
      emailPhoneShow: "email",
    },
  ];
  renderWithProviders(
    <>
      {" "}
      <Routes>
        <Route path="/" element={<ContactListPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </>,
    {
      // یعنی از صفحه کاتکت لیست شروع کن
      route: "/",
      preloadedState: {
        contacts: {
          contacts: fakeContacts,
        },
      },
    }
  );
  // پیدا کردن دکمه ویرایش مخاطب اول و کلیک روی آن
  const editIcons = screen.getAllByRole("link", {
    name: /Edit Contact/,
  });
  await user.click(editIcons[0]);
  // اطمینان از لود شدن صفحه ویرایش
  expect(screen.getByTestId("update-rout")).toBeInTheDocument();
  // تغییرات اینپوت ها
  const nameInput = screen.getByPlaceholderText("Name...");
  await user.clear(nameInput);
  await user.type(nameInput, "name edeited");
  // کلیک روی دکمه آپدیت

  await user.click(screen.getByRole("button", { name: /update/i }));
  // نمایش پیام موفقیت آمیز
  // به همین خاطر موقع رندر شدن کامپوننتم در نظر گرفتیم
  expect(await screen.findByText(/contact was updated/i)).toBeInTheDocument();
  // برگشت به صفحه لیست و نمایش اطلاعات ویرایش‌شده
  expect(await screen.findByText(/Contacts list/i)).toBeInTheDocument();
});

