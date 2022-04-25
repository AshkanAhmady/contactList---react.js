import { toast } from "react-toastify";
import { useState, useEffect } from "react";
// import {
//   getSingleRequest,
//   updateRequest,
// } from "../Services/HttpRequestMethods";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../redux/contact/contactActions";

const EditPage = (props) => {
  const [edit, setEdit] = useState({
    name: "",
    email: "",
    gender: "",
    phone: 0,
    emailPhoneShow: "email",
  });

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  // get current contact
  useEffect(() => {
    let currentContact = contacts.find(
      (item) => item.id == props.match.params.id
    );
    setEdit(currentContact);
  }, []);

  const changeHandler = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // valid PhoneNumber
    if (edit.phone.length !== 11) {
      toast.error("you should enter valid phone number");
      return;
    }

    // send data to core
    dispatch(updateContact(props.match.params.id, edit));

    // clear edit state
    setEdit({
      name: "",
      email: "",
      gender: "",
      phone: 0,
      emailPhoneShow: "email",
    });

    // redirection
    toast.success("Contact Was Updated 👌");
    props.history.push("/");
  };

  return (
    <div className="updateContact">
      <span className="update_text">
        Update (
        {edit.gender == "male" ? (
          <FcBusinessman className="icon" />
        ) : (
          <FcBusinesswoman className="icon" />
        )}
        {edit.name}) Specifications
      </span>
      <form onSubmit={submitHandler}>
        <div className="specifications">
          <input
            required
            placeholder="Name..."
            name="name"
            type="text"
            value={edit.name}
            onChange={changeHandler}
          />
          <input
            required
            placeholder="Email..."
            name="email"
            type="email"
            value={edit.email}
            onChange={changeHandler}
          />
          <input
            required
            placeholder="Phone Number..."
            name="phone"
            type="number"
            value={edit.phone}
            onChange={changeHandler}
          />
        </div>
        <div className="radios">
          <div className="gender">
            <div>
              <label htmlFor="male">Male:</label>
              <input
                required
                onChange={changeHandler}
                type="radio"
                name="gender"
                checked={edit.gender === "male"}
                value="male"
                id="male"
              />
            </div>
            <div>
              <label htmlFor="female">Female:</label>
              <input
                required
                onChange={changeHandler}
                type="radio"
                name="gender"
                checked={edit.gender === "female"}
                value="female"
                id="female"
              />
            </div>
          </div>
          <div className="email_phone_show">
            <div>
              <label htmlFor="email">Show Email:</label>
              <input
                required
                onChange={changeHandler}
                type="radio"
                name="emailPhoneShow"
                checked={edit.emailPhoneShow == "email"}
                value="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="phone">Show Number:</label>
              <input
                required
                onChange={changeHandler}
                type="radio"
                name="emailPhoneShow"
                checked={edit.emailPhoneShow == "phone"}
                value="phone"
                id="phone"
              />
            </div>
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
