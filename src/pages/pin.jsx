import Title from "@/components/Title";
import AsideAuth from "@/components/AsideAuth";
import { useRef, useState, useMemo } from "react";
import { changePin } from "@/utils/https/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PrivateRoute from "@/utils/wrapper/privateRoute";

function SuccessCreate() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full ">
      <span className="w-14 h-14 flex justify-center items-center rounded-full bg-green-500">
        <i className="bi bi-check-lg text-white text-4xl"></i>
      </span>
      <h2 className="text-2xl font-bold my-12">
        Your PIN Was Successfully Created
      </h2>
      <p className="text-grey mb-20">
        Your PIN was successfully created and you can now access all the
        features in FazzPay.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-20 text-center py-4 rounded-lg cursor-pointer w-full border-none bg-primary text-white"
      >
        Go To Dashboard
      </button>
    </div>
  );
}

function Pin() {
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.data.id);

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [msg, setMsg] = useState(false);
  const [input, setInput] = useState(false);
  const [pin, setPin] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const handleConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await changePin(userId, token, pin, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setInvalid(true);
        setMsg(error.response.data.msg);
        setLoading(false);
      }
      if (error.response && error.response.status === 403) {
        setInvalid(true);
        setMsg("Please Login");
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e, inputRef) => {
    if (e.target.value.length === e.target.maxLength) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setInput(true);
    } else {
      setInput(false);
    }

    const input1 = input1Ref.current.value;
    const input2 = input2Ref.current.value;
    const input3 = input3Ref.current.value;
    const input4 = input4Ref.current.value;
    const input5 = input5Ref.current.value;
    const input6 = input6Ref.current.value;

    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
      document.getElementById("confirm-btn").disabled = true;
    } else {
      document.getElementById("confirm-btn").disabled = false;
    }

    const pins = `${input1}${input2}${input3}${input4}${input5}${input6}`;
    setPin(pins);
  };

  // console.log(pin);

  return (
    <Title title="Create PIN">
      <main className="font-nunitosans">
        <section className="flex">
          <div className="relative hidden lg:grid lg:flex-[2]">
            <AsideAuth />
          </div>
          <div className="lg:flex-1 w-full bg-secondary lg:bg-white  px-4 pt-10 lg:pl-12 lg:pr-36 lg:py-28 ">
            {isSuccess ? (
              <SuccessCreate />
            ) : (
              <>
                <h1 className="hidden lg:flex text-font-primary text-2xl font-bold">
                  Secure Your Account, Your Wallet, and Your Data With 6 Digits
                  PIN That You Created Yourself.
                </h1>
                <p className="hidden lg:flex text-font-primary-blur mt-7">
                  Create 6 digits pin to secure all your money and your data in
                  FazzPay app. Keep it secret and don’t tell anyone about your
                  FazzPay account password and the PIN.
                </p>
                <h1 className="text-center text-primary font-bold text-3xl lg:hidden">
                  FazzPay
                </h1>
                <form className="mt-16 bg-white border border-white rounded-t-3xl w-full px-2 md:px-40 lg:px-4 py-10 ">
                  <div className="flex justify-between">
                    <input
                      ref={input1Ref}
                      type="password"
                      className={`border w-12 h-14 rounded-lg outline-none text-center ${
                        input
                          ? "border-primary font-bold"
                          : "border-font-placeholder font-bold"
                      }`}
                      maxLength={1}
                      onChange={(event) => handleInputChange(event, input2Ref)}
                    />
                    <input
                      ref={input2Ref}
                      type="password"
                      className={`border w-12 h-14 rounded-lg outline-none text-center ${
                        input
                          ? "border-primary font-bold"
                          : "border-font-placeholder font-bold"
                      }`}
                      maxLength={1}
                      onChange={(event) => handleInputChange(event, input3Ref)}
                    />
                    <input
                      ref={input3Ref}
                      type="password"
                      className={`border w-12 h-14 rounded-lg outline-none text-center ${
                        input
                          ? "border-primary font-bold"
                          : "border-font-placeholder font-bold"
                      }`}
                      maxLength={1}
                      onChange={(event) => handleInputChange(event, input4Ref)}
                    />
                    <input
                      ref={input4Ref}
                      type="password"
                      className={`border w-12 h-14 rounded-lg outline-none text-center ${
                        input
                          ? "border-primary font-bold"
                          : "border-font-placeholder font-bold"
                      }`}
                      inputMode="numeric"
                      maxLength={1}
                      onChange={(event) => handleInputChange(event, input5Ref)}
                    />
                    <input
                      ref={input5Ref}
                      type="password"
                      className={`border w-12 h-14 rounded-lg outline-none text-center ${
                        input
                          ? "border-primary font-bold"
                          : "border-font-placeholder font-bold"
                      }`}
                      maxLength={1}
                      onChange={(event) => handleInputChange(event, input6Ref)}
                    />
                    <input
                      ref={input6Ref}
                      type="password"
                      className={`border w-12 h-14 rounded-lg outline-none text-center ${
                        input
                          ? "border-primary font-bold"
                          : "border-font-placeholder font-bold"
                      }`}
                      onChange={(event) => handleInputChange(event, input6Ref)}
                      maxLength={1}
                    />
                  </div>
                  <p className="w-full text-center my-5 text-font-error font-semibold">
                    {isInvalid && msg}
                  </p>
                  {isLoading ? (
                    <progress className="progress progress-secondary w-full"></progress>
                  ) : (
                    <button
                      id="confirm-btn"
                      type="submit"
                      onClick={handleConfirm}
                      disabled={isInvalid || pin === ""}
                      className={`mt-20 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                        input ? "bg-primary text-white" : "bg-secondary"
                      }`}
                    >
                      Confirm
                    </button>
                  )}
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </Title>
  );
}

export default PrivateRoute(Pin);
