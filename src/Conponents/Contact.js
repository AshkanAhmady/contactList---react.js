import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { FaTrashAlt, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Contact = ({ contact, onDelete }) => {
  return (
    <div className="single_contact">
      <div className="details">
        <div className="avatar">
          {contact.gender == "male" ? (
            <FcBusinessman className="icon" />
          ) : (
            <FcBusinesswoman className="icon" />
          )}
        </div>
        <div className="name_email">
          <h3>{contact.name}</h3>
          {contact.emailPhoneShow == "email" ? (
            <span>{contact.email}</span>
          ) : (
            <span>{contact.phone}</span>
          )}
        </div>
      </div>
      <div className="options">
        <Link
          className="edit"
          // static => send data to another Route
          to={{
            pathname: `/edit/${contact.id}`,
            state: { contact: contact },
          }}
        >
          <Tippy content="Edit Contact">
            <div>
              <FaEllipsisV className="moreIcon" />
            </div>
          </Tippy>
        </Link>
        <FaTrashAlt onClick={onDelete} className="icon" />
      </div>
    </div>
  );
};

export default Contact;
