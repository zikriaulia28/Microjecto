import Title from "@/components/title";
import AsideAuth from "@/components/AsideAuth";
import { useState, useMemo } from "react";
import PublicRoute from "@/utils/wrapper/publicRoute";
import { useRouter } from "next/router";
import { resetPassword } from "@/utils/https/auth";
import Image from "next/image";
import show from "../../assets/auth/show.svg";
import hide from "../../assets/auth/hide.svg";
import Link from "next/link";

function ResetPassword() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [inputNewPassword, setInputNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputConfirmPassword, setInputConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPassword = (e) => {
    if (e.target.value) {
      setInputNewPassword(true);
      setInvalid(false);
    } else {
      setInputNewPassword(false);
    }
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value) {
      setInputConfirmPassword(true);
      setInvalid(false);
    } else {
      setInputConfirmPassword(false);
    }
    setConfirmPassword(e.target.value);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setInvalid(true);
      setMsg("Your password does not match.!");
      return;
    }
    setLoading(true);
    try {
      const body = {
        keysChangePassword: router.query.otp,
        newPassword,
        confirmPassword,
      };
      console.log(body);
      const result = await resetPassword(body, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setMsg(error.response.data.msg);
        setInvalid(true);
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <Title title={"Forgot Password"}>
      <main>
        <section className="flex">
          <div className="relative hidden lg:grid lg:flex-[2]">
            <AsideAuth />
          </div>

          <div className="lg:flex-1 w-full bg-secondary lg:bg-white  pt-10 lg:pl-12 lg:pr-36 lg:py-28 ">
            <h1 className="hidden lg:flex text-font-primary text-2xl font-bold">
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </h1>
            <p className="hidden lg:flex text-font-primary-blur mt-7">
              Now you can create a new password for your FazzPay account. Type
              your password twice so we can confirm your new passsword.
            </p>
            <h1 className="text-center text-primary font-bold text-3xl lg:hidden">
              FazzPay
            </h1>
            <form className="mt-16 bg-white border border-white rounded-t-3xl w-full px-4 py-10 ">
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
                    placeholder="Create new password"
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
              <p className="w-full text-center my-5 text-green-500 font-semibold text-lg">
                {isSuccess && msg}
              </p>
              {isLoading ? (
                <progress className="progress progress-secondary w-full"></progress>
              ) : isError ? (
                <Link
                  href={"/forgot"}
                  className="py-4 px-6 rounded-xl text-white bg-primary"
                >
                  Go Back
                </Link>
              ) : isSuccess ? (
                <Link
                  href={"/login"}
                  className="py-4 px-6 rounded-xl text-white bg-primary"
                >
                  Go Login
                </Link>
              ) : (
                <button
                  onClick={handleResetPassword}
                  className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                    inputNewPassword && inputConfirmPassword
                      ? "bg-primary text-white"
                      : "bg-secondary"
                  }`}
                >
                  Confirm
                </button>
              )}
            </form>
          </div>
        </section>
      </main>
    </Title>
  );
}

export default PublicRoute(ResetPassword);
