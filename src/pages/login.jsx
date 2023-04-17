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
      <Head>
        <title>Fazzpay - Login</title>
      </Head>
      <main>
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
              <h1 className="text-3xl text-font-secondary text mt-12 font-bold font-nunitosans">
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
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </h1>
            <p className="text-font-primary-blur mt-7">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            <form className="mt-16">
              <div>
                <span className="relative">
                  <span className="absolute bottom-0">
                    <Image src={email} alt="email" />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your e-mail"
                    className="placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none"
                    autoComplete="off"
                  />
                </span>
              </div>
              <div className="mt-16">
                <span className="relative">
                  <span className="absolute bottom-0">
                    <Image src={lock} alt="email" />
                  </span>
                  <span className="absolute bottom-0 right-4 w-4 h-4">
                    <Image
                      src={showPassword ? show : hide}
                      alt="hide"
                      className="w-full h-full object-cover"
                      onClick={togglePassword}
                    />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none"
                    autoComplete="off"
                    onChange={handlePasswordChange}
                  />
                </span>
              </div>
              <Link href="/forgot">
                <p className="text-end mt-5 cursor-pointer">Forgot password?</p>
              </Link>
              <div className="mt-20 text-center py-4 rounded-lg cursor-pointer disabled bg-secondary w-full border-none">
                Login
              </div>
              <p className="text-center mt-10">
                Don’t have an account? Let’s{" "}
                <Link href="/signup">
                  <span className="cursor-pointer text-primary">Sign Up</span>
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
