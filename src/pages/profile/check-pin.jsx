import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import Aside from "@/components/AsideMenu";
import { useRef, useState, useMemo } from "react";
import { checkPin } from "@/utils/https/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function ChangePin() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [msg, setMsg] = useState("");
  const [input, setInput] = useState(false);
  const [pin, setPin] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const result = await checkPin(token, pin, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        setLoading(false);
        input1Ref.current.value = "";
        input2Ref.current.value = "";
        input3Ref.current.value = "";
        input4Ref.current.value = "";
        input5Ref.current.value = "";
        input6Ref.current.value = "";
        setInput(false);
        setMsg(result.data.msg);
        router.push(`/profile/change-pin`);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status && error.response.status === 400) {
        setMsg(error.response.data.msg);
        setLoading(false);
        setInvalid(true);
      }
    }
  };

  const handleInputChange = (e, inputRef) => {
    if (e.target.value.length === e.target.maxLength) {
      if (inputRef.current) {
        inputRef.current.focus();
        setInvalid(false);
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

    // if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
    //   document.getElementById("confirm-btn").disabled = true;
    // } else {
    //   document.getElementById("confirm-btn").disabled = false;
    // }

    const pins = `${input1}${input2}${input3}${input4}${input5}${input6}`;
    setPin(pins);
  };

  console.log(pin);
  return (
    <Title title={"Change Pin"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-36 py-10 bg-secondary font-nunitosans">
        <Aside />
        <section className="flex flex-col p-6 md:w-[736px] xl:w-[53.125rem] xl:h-[42.375rem] bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-lg">Change PIN</h1>
          <p className="w-[21.375rem] text-font-primary-blur mt-6">
            Enter your current 6 digits Fazzpay PIN below to continue to the
            next steps.
          </p>
          <div className="xl:px-52">
            <form className="mt-24">
              <div className="flex gap-4">
                <input
                  ref={input1Ref}
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                <>
                  <button
                    type="submit"
                    onClick={handleCheck}
                    disabled={isInvalid || pin === ""}
                    className={`mt-16 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                      input ? "bg-primary text-white" : "bg-secondary"
                    }`}
                  >
                    Continue
                  </button>
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

export default ChangePin;
