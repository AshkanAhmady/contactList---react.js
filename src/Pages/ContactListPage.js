import { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import Contact from "../Conponents/Contact";
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";
import { deleteRequest, getRequest } from "../Services/HttpRequestMethods";

let sort = "desc";

const ContactListPage = () => {
  const [contacts, setContacts] = useState(null);
  // const [sort, setSort] = useState("desc");
  const [filterContact, setFilterContact] = useState([]);

  // mounting
  useEffect(() => {
    sortListHandler(sort);
  }, []);

  // updating contacts
  useEffect(() => {
    setFilterContact(contacts);
  }, [contacts]);

  // delete content
  const deleteHandler = async (id) => {
    try {
      await deleteRequest(id);
      const response = await getRequest();

      let sortedContacts = [...response.data];
      sortedContacts = _.orderBy(sortedContacts, ["id"], [sort]);
      setContacts(sortedContacts);
      toast.success("Contact Deleted 👌");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // sort list
  const sortListHandler = (sortValue) => {
    getRequest()
      .then((response) => {
        let sortedContacts = [...response.data];
        sortedContacts = _.orderBy(sortedContacts, ["id"], [sortValue]);
        setContacts(sortedContacts);
        sort = sortValue;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // search method
  const filterHandler = (e) => {
    if (e.target.value == "") {
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
    let renderValue = <p>Loading ...</p>;

    if (contacts && contacts.length == 0) {
      renderValue = <p className="emptyList">The contact list is empty !</p>;
    }

    if (
      contacts &&
      contacts.length > 0 &&
      filterContact &&
      filterContact.length == 0
    ) {
      renderValue = <p>Searched Contact Dosen`t Exists !</p>;
    }

    if (filterContact && filterContact.length > 0) {
      renderValue = filterContact.map((c) => {
        return (
          <Contact
            onDelete={() => deleteHandler(c.id)}
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
          <div className="contactList_options">
            <input
              onChange={filterHandler}
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
