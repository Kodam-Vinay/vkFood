import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReusableButton from "../../utils/ReusableButton";
import ReusableInput from "../../utils/ReusableInput";
import { CONTACT_API_URL } from "../../config/Constants";
import Footer from "../../components/Footer";

const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [apiStatus, setApiStatus] = useState({
    status: constApiStatus.initial,
    errorMsg: null,
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setApiStatus((prev) => ({
      ...prev,
      status: constApiStatus.inProgress,
      errorMsg: null,
    }));
    if (!name || !email || !title || !message) {
      setApiStatus((prev) => ({
        ...prev,
        status: constApiStatus.failure,
        errorMsg: "Please Enter The values",
      }));
    } else {
      const contactData = {
        name: name,
        email: email,
        title: title,
        message: message,
      };

      try {
        const apiUrl = CONTACT_API_URL;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        };
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          setApiStatus((prev) => ({
            ...prev,
            status: constApiStatus.success,
            errorMsg: null,
          }));
          setName("");
          setEmail("");
          setTitle("");
          setMessage("");
        } else {
          setApiStatus((prev) => ({
            ...prev,
            errorMsg: "Please Enter Valid Details",
            status: constApiStatus.failure,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderButton = () => {
    const { status } = apiStatus;
    switch (status) {
      case constApiStatus.initial:
        return (
          <ReusableButton
            type="submit"
            value="Send 📩"
            className="px-3 mt-2 w-32"
          />
        );
      case constApiStatus.success:
        return (
          <ReusableButton
            type="submit"
            value="Success ✅"
            className="px-3 mt-2 bg-green-300 w-32"
            isDisabledTrue={true}
          />
        );
      case constApiStatus.failure:
        return (
          <ReusableButton
            type="submit"
            value="Fail ❌"
            className="px-3 mt-2 bg-red-300 w-32"
          />
        );
      case constApiStatus.inProgress:
        return (
          <ReusableButton
            type="submit"
            className="px-2 flex flex-col items-center justify-center w-32"
            value={
              <ThreeDots
                height="30"
                width="80"
                radius="9"
                color="#93c5fd"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            }
          />
        );
      default:
        break;
    }
  };

  return (
    <div id="contact" className="h-[90%]">
      <div className="p-1 xs:p-4 mt-4 sm:px-12 md:px-[65px] lg:px-[142px] flex flex-col h-full">
        <div className="mt-4 md:flex md:items-center space-x-6 justify-around">
          <form onSubmit={onSubmitForm} className="space-y-3 order-2">
            <div className="space-y-3 md:space-y-0 md:flex md:space-x-3">
              <ReusableInput
                type="text"
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
                value={name}
                isDisabledTrue={apiStatus.status === constApiStatus.success}
              />
              <ReusableInput
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                isDisabledTrue={apiStatus.status === constApiStatus.success}
              />
            </div>
            <ReusableInput
              type="text"
              placeholder="Title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              isDisabledTrue={apiStatus.status === constApiStatus.success}
            />
            <textarea
              className="bg-transparent border p-2 w-full outline-blue-400 rounded-md"
              rows={5}
              placeholder="Message"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              disabled={apiStatus.status === constApiStatus.success}
            />
            {renderButton()}
            <p className="text-red-500">
              {apiStatus.errorMsg ? apiStatus.errorMsg : null}
            </p>
          </form>
        </div>
        <div className="sticky mt-auto h-full flex flex-col items-center w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Contact;
