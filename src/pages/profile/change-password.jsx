import Header from "@/components/header";
import Footer from "@/components/footer";
import Title from "@/components/Title";
import Aside from "@/components/SideBar";
import Image from "next/image";
import show from "../../assets/auth/show.svg";
import hide from "../../assets/auth/hide.svg";
import Link from "next/link";
import { useState, useMemo } from "react";
import { editPassword } from "@/utils/https/user";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PrivateRoute from "@/utils/wrapper/privateRoute";

function ChangePassword() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputOldPassword, setInputOldPassword] = useState(false);
  const [inputNewPassword, setInputNewPassword] = useState(false);
  const [inputConfirmPassword, setInputConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const handleOldPassword = (e) => {
    if (e.target.value) {
      setInputOldPassword(true);
    } else {
      setInputOldPassword(false);
    }
    setOldPassword(e.target.value);
    setInvalid(false);
  };

  const handleNewPassword = (e) => {
    if (e.target.value) {
      setInputNewPassword(true);
    } else {
      setInputNewPassword(false);
    }
    setNewPassword(e.target.value);
    setInvalid(false);
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value) {
      setInputConfirmPassword(true);
    } else {
      setInputConfirmPassword(false);
    }
    setConfirmPassword(e.target.value);
    setInvalid(false);
  };

  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlerChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
        setMsg("Input is required!");
        setInvalid(true);
        setLoading(false);
        return;
      }
      const result = await editPassword(
        userId,
        token,
        oldPassword,
        newPassword,
        confirmPassword,
        controller
      );
      if (result.status === 200) {
        setMsg(result.data.msg);
        setSuccess(true);
        setLoading(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          setMsg(error.response.data.msg);
        }
        setInvalid(true);
        setLoading(false);
      }
    }
  };

  return (
    <Title title={"Change Password"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-20 py-10 bg-secondary font-nunitosans">
        <Aside namePage="profile" />
        <section className="flex flex-col p-6 w-full xl:h-[42.375rem] bg-white rounded-xl shadow">
          <h1 className="font-bold text-lg">Change Password</h1>
          <p className="md:w-[21.375rem] text-font-primary-blur mt-6">
            You must enter your current password and then type your new password
            twice.
          </p>
          <div className="w-full px-4 md:px-32 lg:px-52">
            <form className="mt-16">
              <div className="">
                <span className="relative">
                  <i
                    className={`bi bi-lock-fill text-2xl absolute -top-2 ${
                      inputOldPassword
                        ? "text-primary"
                        : "text-font-placeholder"
                    }`}
                  ></i>
                  <span className="absolute bottom-0 right-4 w-4 h-4">
                    <Image
                      src={showOldPassword ? show : hide}
                      alt="hide"
                      className="w-full h-full object-cover"
                      onClick={toggleOldPassword}
                    />
                  </span>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Current password"
                    className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                      inputOldPassword
                        ? "border-b-primary"
                        : "border-b-font-placeholder"
                    }`}
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleOldPassword}
                  />
                </span>
              </div>

              <div className="mt-16">
                <span className="relative">
                  <i
                    className={`bi bi-lock-fill text-2xl absolute -top-2 ${
                      inputNewPassword
                        ? "text-primary"
                        : "text-font-placeholder"
                    }`}
                  ></i>
                  <span className="absolute bottom-0 right-4 w-4 h-4">
                    <Image
                      src={showNewPassword ? show : hide}
                      alt="hide"
                      className="w-full h-full object-cover"
                      onClick={toggleNewPassword}
                    />
                  </span>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                      inputNewPassword
                        ? "border-b-primary"
                        : "border-b-font-placeholder"
                    }`}
                    name="newPassword"
                    value={newPassword}
                    onChange={handleNewPassword}
                  />
                </span>
              </div>

              <div className="mt-16">
                <span className="relative">
                  <i
                    className={`bi bi-lock-fill text-2xl absolute -top-2 ${
                      inputConfirmPassword
                        ? "text-primary"
                        : "text-font-placeholder"
                    }`}
                  ></i>
                  <span className="absolute bottom-0 right-4 w-4 h-4">
                    <Image
                      src={showConfirmPassword ? show : hide}
                      alt="hide"
                      className="w-full h-full object-cover"
                      onClick={toggleConfirmPassword}
                    />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                      inputConfirmPassword
                        ? "border-b-primary"
                        : "border-b-font-placeholder"
                    }`}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
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
                    <Link
                      href={`/profile/${userId}`}
                      className={`btn mt-5 text-center py-4 rounded-lg cursor-pointer w-full hover:bg-primary border-none input bg-primary text-white`}
                    >
                      Go Back
                    </Link>
                  ) : (
                    <button
                      onClick={handlerChangePassword}
                      disabled={
                        oldPassword === "" ||
                        newPassword === "" ||
                        confirmPassword === "" ||
                        isInvalid
                      }
                      className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                        inputOldPassword && inputNewPassword && confirmPassword
                          ? "bg-primary text-white"
                          : "bg-secondary"
                      }`}
                    >
                      Change Password
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

export default PrivateRoute(ChangePassword);
