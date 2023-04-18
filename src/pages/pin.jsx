import Head from "next/head";
import Image from "next/image";
import bg from "../assets/auth/background.png";
import phone from "../assets/auth/phones.png";
import { useRef, useState } from "react";
// import Link from "next/link";

function Pin() {
  const [input, setInput] = useState(false);
  const [newPin, setNewPins] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

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
    setNewPins(pins);
  };

  console.log(newPin);

  return (
    <>
      <main>
        <Head>
          <title>Fazzpay - Create Pin</title>
        </Head>
        <section className="flex">
          <div className="relative lg:flex-[2]">
            <div className="absolute -z-10 w-full">
              <Image src={bg} alt="background" className="w-full h-full" />
            </div>
            <div className="absolute w-[512px] h-[575px] translate-x-28 translate-y-32 ">
              <Image
                src={phone}
                alt="phone"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pl-36 pr-32">
              <h1 className="text-3xl text-font-secondary text mt-12 font-bold">
                FazzPay
              </h1>
              <div className="mt-[120%] ">
                <p className="text-font-secondary font-bold text-3xl">
                  App that Covering Banking Needs.
                </p>
                <p className="text-[#FFFFFFCC] text-base mt-7">
                  FazzPay is an application that focussing in banking needs for
                  all users in the world. Always updated and always following
                  world trends. 5000+ users registered in FazzPay everyday with
                  worldwide users coverage.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:flex-1 pl-12 pr-36 py-28 ">
            <h1 className="text-font-primary text-2xl font-bold">
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </h1>
            <p className="text-font-primary-blur mt-7">
              Create 6 digits pin to secure all your money and your data in
              FazzPay app. Keep it secret and don’t tell anyone about your
              FazzPay account password and the PIN.
            </p>
            <form className="mt-16">
              <div className="flex gap-5">
                <input
                  ref={input1Ref}
                  type="text"
                  className={`border w-12 h-14 rounded-lg outline-none text-center ${
                    input ? "border-primary" : "border-font-placeholder"
                  }`}
                  maxLength={1}
                  onChange={(event) => handleInputChange(event, input2Ref)}
                />
                <input
                  ref={input2Ref}
                  type="text"
                  className={`border w-12 h-14 rounded-lg outline-none text-center ${
                    input ? "border-primary" : "border-font-placeholder"
                  }`}
                  maxLength={1}
                  onChange={(event) => handleInputChange(event, input3Ref)}
                />
                <input
                  ref={input3Ref}
                  type="text"
                  className={`border w-12 h-14 rounded-lg outline-none text-center ${
                    input ? "border-primary" : "border-font-placeholder"
                  }`}
                  maxLength={1}
                  onChange={(event) => handleInputChange(event, input4Ref)}
                />
                <input
                  ref={input4Ref}
                  type="text"
                  className={`border w-12 h-14 rounded-lg outline-none text-center ${
                    input ? "border-primary" : "border-font-placeholder"
                  }`}
                  maxLength={1}
                  onChange={(event) => handleInputChange(event, input5Ref)}
                />
                <input
                  ref={input5Ref}
                  type="text"
                  className={`border w-12 h-14 rounded-lg outline-none text-center ${
                    input ? "border-primary" : "border-font-placeholder"
                  }`}
                  maxLength={1}
                  onChange={(event) => handleInputChange(event, input6Ref)}
                />
                <input
                  ref={input6Ref}
                  type="text"
                  className={`border w-12 h-14 rounded-lg outline-none text-center ${
                    input ? "border-primary" : "border-font-placeholder"
                  }`}
                  onChange={(event) => handleInputChange(event, input6Ref)}
                  maxLength={1}
                />
              </div>
              <button
                id="confirm-btn"
                className={`mt-20 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                  input ? "bg-primary text-white" : "bg-secondary"
                }`}
              >
                Confirm
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Pin;
