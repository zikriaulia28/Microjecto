import Title from "@/components/title";
import AsideAuth from "@/components/AsideAuth";
import { useState, useMemo } from "react";
import PublicRoute from "@/utils/wrapper/publicRoute";
import { forgotPassword } from "@/utils/https/auth";

function Forgot() {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState(false);

  const handleEmail = (e) => {
    if (e.target.value) {
      setInput(true);
      setInvalid(false);
    } else {
      setInput(false);
    }
    setEmail(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const body = {
        email: email,
        linkDirect: "http://localhost:3000/forgot",
      };
      if (email === "") {
        setMsg("Input is required!");
        setInvalid(true);
        setLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMsg("Email is invalid!");
        setInvalid(true);
        setLoading(false);
        return;
      }
      const result = await forgotPassword(body, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setMsg(result.data.msg);
        setIsSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setMsg(error.response.data.msg);
        setInvalid(true);
        setLoading(false);
      }
    }
  };

  return (
    <>
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
                To reset your password, you must type your e-mail and we will
                send a link to your email and you will be directed to the reset
                password screens.
              </p>
              <h1 className="text-center text-primary font-bold text-3xl lg:hidden">
                FazzPay
              </h1>
              <form className="mt-16 bg-white border border-white rounded-t-3xl w-full px-4 py-10 ">
                <div>
                  <span className="relative">
                    <i
                      className={`bi bi-envelope-fill text-2xl absolute -top-2 ${
                        input ? "text-primary" : "text-font-placeholder"
                      }`}
                    ></i>
                    <input
                      type="email"
                      placeholder="Enter your e-mail"
                      className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                        input ? "border-b-primary" : "border-b-font-placeholder"
                      }`}
                      name="email"
                      value={email}
                      onChange={handleEmail}
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
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSuccess}
                    className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                      input ? "bg-primary text-white" : "bg-secondary"
                    } ${isSuccess && "bg-secondary text-black"}`}
                  >
                    Confirm
                  </button>
                )}
              </form>
            </div>
          </section>
        </main>
      </Title>
    </>
  );
}

export default PublicRoute(Forgot);
