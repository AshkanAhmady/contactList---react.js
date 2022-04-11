import { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import Contact from "../Conponents/Contact";
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";
import { deleteRequest, getRequest } from "../Services/HttpRequestMethods";

const ContactListPage = () => {
  const [contacts, setContacts] = useState(null);

  // mounting
  useEffect(() => {
    sortListHandler("desc");
  }, []);

  // delete content
  const deleteHandler = async (id) => {
    try {
      await deleteRequest(id);
      const response = await getRequest();

      let sortedContacts = [...response.data];
      sortedContacts = _.orderBy(sortedContacts, ["id"], ["desc"]);
      setContacts(sortedContacts);
      toast.success("Contact Deleted 👌");
    } catch (error) {
      console.log(error);
    }
  };

  // sort list
  const sortListHandler = (value) => {
    getRequest()
      .then((response) => {
        let sortedContacts = [...response.data];
        sortedContacts = _.orderBy(sortedContacts, ["id"], [value]);
        setContacts(sortedContacts);
      })
      .catch((error) => console.log(error));
  };

  // render elements
  const renderContacts = () => {
    let renderValue = <p>Loading ...</p>;

    if (contacts && contacts.length == 0) {
      renderValue = <p className="emptyList">The contact list is empty !</p>;
    }

    if (contacts && contacts.length > 0) {
      renderValue = contacts.map((c) => {
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
        {contacts && contacts.length > 1 && (
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
      <section>{renderContacts()}</section>
    </div>
  );
};

export default ContactListPage;
