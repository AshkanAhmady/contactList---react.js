import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { updateContact } from "../features/contact/contactSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const [edit, setEdit] = useState({
    name: "",
    email: "",
    gender: "male",
    phone: 0,
    emailPhoneShow: "email",
  });

  const selectedContact = useParams();
  let navigate = useNavigate();

  const { contacts } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  // get current contact
  useEffect(() => {
    let currentContact = contacts.find(
      (item) => item.id === +selectedContact.id!
    );
    setEdit(currentContact!);
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // valid PhoneNumber
    if (edit.phone.toString().length !== 11) {
      toast.error("you should enter valid phone number");
      return;
    }

    // send data to core
    let id = selectedContact.id;
    dispatch(updateContact({ id, edit }));

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
    navigate("/");
  };

  return (
    <div className="updateContact" data-testid="update-rout">
      <span className="update_text">
        Update (
        {edit.gender === "male" ? (
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
                checked={edit.emailPhoneShow === "email"}
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
                checked={edit.emailPhoneShow === "phone"}
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
