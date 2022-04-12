import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  getSingleRequest,
  updateRequest,
} from "../Services/HttpRequestMethods";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";

const SingleContactPage = (props) => {
  const [edit, setEdit] = useState({
    name: "",
    email: "",
    gender: "",
    phone: 0,
    emailPhoneShow: "email",
  });

  // get current contact
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await getSingleRequest(props.match.params.id);
        setEdit(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchContact();
  }, []);

  const changeHandler = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit.phone.length !== 11) {
      toast.error("you should enter valid phone number");
      return;
    }

    updateContactHandler(edit);
    setEdit({
      name: "",
      email: "",
      gender: "",
      phone: 0,
      emailPhoneShow: "email",
    });
  };

  // update contact
  const updateContactHandler = (edit) => {
    updateRequest(props.match.params.id, edit)
      .then(() => {
        toast.success("Contact Was Updated 👌");
        props.history.push("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="updateContact">
      <span className="update_text">
        Upade (
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
        <div className="gender">
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
        <div className="email_phone_show">
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default SingleContactPage;
