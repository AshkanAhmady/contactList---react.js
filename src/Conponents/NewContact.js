import { useState } from "react";

const NewContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({ name: "", email: "", gender: "" });

  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addContactHandler(contact);
  };

  return (
    <div className="newContact">
      <span>Add New Contact</span>
      <form onSubmit={submitHandler}>
        <div className="specifications">
          <input
            required
            placeholder="Your Name"
            name="name"
            type="text"
            value={contact.name}
            onChange={changeHandler}
          />
          <input
            required
            placeholder="Your Email"
            name="email"
            type="email"
            value={contact.email}
            onChange={changeHandler}
          />
        </div>
        <div className="gender">
          <label htmlFor="male">Male:</label>
          <input
            required
            onChange={changeHandler}
            type="radio"
            name="gender"
            value="male"
            id="male"
          />
          <label htmlFor="female">Female:</label>
          <input
            required
            onChange={changeHandler}
            type="radio"
            name="gender"
            value="female"
            id="female"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewContact;
