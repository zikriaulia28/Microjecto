import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { editProfile } from "@/utils/https/user";

function EditPhone() {
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;
  const [input, setInput] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const handlerPhoneNumber = (e) => {
    if (e.target.value) {
      setInput(true);
    } else {
      setInput(false);
    }
    setPhoneNumber(e.target.value);
    setNoTelp(`+62${phoneNumber}`);
    setInvalid(false);
    setSuccess(false);
  };

  const editPhoneNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (phoneNumber === "") {
        setMsg("Please enter a phone number");
        setInvalid(true);
        setLoading(false);
        return;
      }
      const result = await editProfile(token, userId, noTelp, controller);
      console.log(result);
      if (result.status === 200) {
        setMsg("Updated phone number successfully");
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setInvalid(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-8 md:w-[736px] xl:w-[53.125rem] xl:h-[42.375rem] bg-white rounded-xl shadow-lg">
      <h1 className="font-bold text-lg">Edit Phone Number</h1>
      <p className="w-[21.375rem] text-font-primary-blur mt-6">
        Add at least one phone number for the transfer ID so you can start
        transfering your money to another user.
      </p>
      <div className="px-52">
        <form className="mt-32">
          <div>
            <span className="relative">
              <div className="flex gap-4 absolute top-0">
                <i
                  className={`bi bi-telephone text-2xl  ${
                    input ? "text-primary" : "text-font-placeholder"
                  } `}
                ></i>
                <p>+62</p>
              </div>
              <input
                type="number"
                placeholder="Enter your phone number"
                className={`placeholder:text-font-placeholder pl-20 border-b-2 w-full py-3 outline-none ${
                  input ? "border-b-primary" : "border-b-font-placeholder"
                }`}
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlerPhoneNumber}
              />
            </span>
          </div>

          <p className="w-full text-center my-5 text-font-error font-semibold">
            {isInvalid && msg}
          </p>
          <p className="w-full text-center my-5 text-green-500 font-semibold">
            {isSuccess && msg}
          </p>
          {isLoading ? (
            <progress className="progress progress-secondary w-full"></progress>
          ) : (
            <button
              onClick={editPhoneNumber}
              className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                input ? "bg-primary text-white" : "bg-secondary"
              }`}
            >
              Edit Phone Number
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditPhone;
