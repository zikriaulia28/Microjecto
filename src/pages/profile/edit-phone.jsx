import Title from "@/components/Title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/SideBar";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { editProfile } from "@/utils/https/user";
import { useDispatch } from "react-redux";
import { userAction } from "@/redux/slices/auth";
import { useRouter } from "next/router";

function EditPhone() {
  const router = useRouter();
  const dispatch = useDispatch();
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
    console.log(phoneNumber);
    const body = { noTelp };
    try {
      if (phoneNumber === "") {
        setMsg("Please enter a phone number");
        setInvalid(true);
        setLoading(false);
        return;
      }
      const result = await editProfile(token, userId, body, controller);
      console.log(result.data.data.noTelp);
      const updatePhone = result.data.data.noTelp;
      if (result.status === 200) {
        dispatch(userAction.editPhoneUser(updatePhone));
        setMsg("Updated phone number successfully");
        setSuccess(true);
        setInvalid(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setInvalid(true);
      setLoading(false);
    }
  };

  const handleNavigate = (to) => {
    router.push(to);
  };

  return (
    <Title>
      <Header />
      <main className="flex gap-5 px-4 xl:px-36 py-10 bg-secondary font-nunitosans">
        <Aside namePage="profile" />
        <section className="flex flex-col p-8 md:w-[736px] xl:w-[53.125rem] xl:h-[42.375rem] bg-white rounded-xl shadow">
          <h1 className="font-bold text-lg">Edit Phone Number</h1>
          <p className="w-[21.375rem] text-font-primary-blur mt-6">
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </p>
          <div className="xl:px-52">
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
                <>
                  {isSuccess ? (
                    <button
                      onClick={() =>
                        router.push(`/profile/${userStore.data.id}`)
                      }
                      className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                        input ? "bg-primary text-white" : "bg-secondary"
                      }`}
                    >
                      Back
                    </button>
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
                </>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default EditPhone;
