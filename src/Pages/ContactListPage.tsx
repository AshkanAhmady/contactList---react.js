import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Contact from "../Components/Contact";
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { deleteContact, sortContact } from "../features/contact/contactSlice";
import { ContactType } from "../types";

let sort = "desc";

const ContactListPage = () => {
  const { contacts } = useAppSelector((state) => state.contacts);
  const [filterContact, setFilterContact] = useState<ContactType[] | []>([]);

  const dispatch = useAppDispatch();

  // updating contacts
  useEffect(() => {
    setFilterContact(contacts);
  }, [contacts]);

  // delete content
  const deleteHandler = (id: number) => {
    dispatch(deleteContact({ id, sort }));
    toast.success("Contact Deleted 👌");
  };

  // sort list
  const sortListHandler = (sortValue: "asc" | "desc") => {
    dispatch(sortContact(sortValue));
    sort = sortValue;
  };

  // search method
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFilterContact(contacts);
    } else {
      let filteredList = contacts.filter((contact) =>
        // get all values in one contact
        // and search in all values in one contact
        //  Object.values ==> all values of object
        // join(" ") ==> join this values and turn to string
        Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );

      setFilterContact(filteredList);
    }
  };

  // render elements
  const renderContacts = () => {
    let renderValue: ReactElement | ReactElement[] = <p>Loading ...</p>;

    if (contacts && contacts.length === 0) {
      renderValue = <p className="emptyList">The contact list is empty !</p>;
    }

    if (
      contacts &&
      contacts.length > 0 &&
      filterContact &&
      filterContact.length === 0
    ) {
      renderValue = <p>Searched Contact Dosen`t Exists !</p>;
    }

    if (filterContact && filterContact.length > 0) {
      renderValue = filterContact.map((c) => {
        return (
          <Contact
            onDelete={() => deleteHandler(c.id!)}
            key={c.id}
            contact={c}
          />
        );
      });
    }

    return renderValue;
  };

  return (
    <div className="contactsList">
      <div className="listHeader">
        <span>Contacts list</span>

        {contacts && contacts.length > 0 && (
          <div className="contactList_options" data-testid="contact-item">
            <input
              onChange={searchHandler}
              placeholder="Search..."
              type="text"
            />
            {contacts.length > 1 && (
              <div>
                <FcGenericSortingAsc
                  onClick={() => sortListHandler("asc")}
                  className="icon"
                />
                <FcGenericSortingDesc
                  onClick={() => sortListHandler("desc")}
                  className="icon"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <section>{renderContacts()}</section>
    </div>
  );
};

export default ContactListPage;
