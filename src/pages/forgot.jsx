import Head from "next/head";
import Image from "next/image";
import bg from "../assets/auth/background.png";
import email from "../assets/auth/email.svg";
import lock from "../assets/auth/lock.svg";
import phone from "../assets/auth/phones.png";
import show from "../assets/auth/show.svg";
import hide from "../assets/auth/hide.svg";
import { useState } from "react";
import Link from "next/link";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <main>
        <Head>
          <title>Fazzpay - Forgot</title>
        </Head>
        <section className="flex">
          <div className="relative hidden lg:grid lg:flex-[2]">
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
          <div className="lg:flex-1 w-full bg-secondary lg:bg-white  pt-10 lg:pl-12 lg:pr-36 lg:py-28 ">
            <h1 className="hidden lg:flex text-font-primary text-2xl font-bold">
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </h1>
            <p className="hidden lg:flex text-font-primary-blur mt-7">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </p>
            <h1 className="text-center text-primary font-bold text-3xl lg:hidden">
              FazzPay
            </h1>
            <form className="mt-16 bg-white border border-white rounded-t-3xl w-full px-4 py-10 ">
              <div>
                <span className="relative">
                  <span className="absolute bottom-0">
                    <Image src={email} alt="email" />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your e-mail"
                    className="placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none"
                  />
                </span>
              </div>
              <div className="mt-20 text-center py-4 rounded-lg cursor-pointer disabled bg-secondary w-full border-none">
                Confirm
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
