import { toast } from "react-toastify";

const SingleContactPage = ({ location, history }) => {
  // redirection
  if (!location.state) {
    history.push("/");
    toast.error("you sould go to this URL with 'option' button 😡");
    return;
  }

  let { contact } = location.state;

  return <div>{contact.name}</div>;
};

export default SingleContactPage;
