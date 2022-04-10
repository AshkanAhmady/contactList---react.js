import Contact from "./Contact";

const ContactsList = ({ contacts, deleteHandler }) => {
  return (
    <div className="contactsList">
      <span>Contacts list</span>
      <section>
        {contacts.length > 0 ? (
          contacts.map((c) => {
            return (
              <Contact
                onDelete={() => deleteHandler(c.id)}
                key={c.id}
                contact={c}
              />
            );
          })
        ) : (
          <p className="emptyList">The contact list is empty !</p>
        )}
      </section>
    </div>
  );
};

export default ContactsList;
