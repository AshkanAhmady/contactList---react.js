import { useEffect, useState } from "react";
import ContactsList from "../Conponents/ContactsList";
import AddContact from "../Conponents/AddContact";
import _ from "lodash";
import { toast } from "react-toastify";

const ContactApp = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) setContacts(storedContacts);
  }, []);

  // set data in localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
    <div className="contactApp">
      <h2>Contact App</h2>
      <div>
        <AddContact addContactHandler={addContactHandler} />
        <ContactsList deleteHandler={deleteHandler} contacts={contacts} />
      </div>
    </div>
  );
};

export default ContactApp;
