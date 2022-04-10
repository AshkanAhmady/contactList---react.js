import { useState } from "react";
import ContactsList from "../Conponents/ContactsList";
import NewContact from "../Conponents/NewContact";
import _ from "lodash";
import { toast } from "react-toastify";

const ContactListApp = () => {
  const [contacts, setContacts] = useState([]);

  //   create contact
  const addContactHandler = (contact) => {
    let sortedContacts = [...contacts, { ...contact, id: Date.now() }];
    sortedContacts = _.orderBy(sortedContacts, ["id"], ["desc"]);
    setContacts(sortedContacts);
    toast.success("New Contact Added 👌");
  };

  // delete Contact
  const deleteHandler = (id) => {
    setContacts(contacts.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h2>Contact List App</h2>
      <div>
        <NewContact addContactHandler={addContactHandler} />
        <ContactsList deleteHandler={deleteHandler} contacts={contacts} />
      </div>
    </div>
  );
};

export default ContactListApp;
