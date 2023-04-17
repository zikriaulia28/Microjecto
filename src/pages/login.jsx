import Head from "next/head";
import Image from "next/image";
import bg from "../assets/auth/background.png";
import phone from "../assets/auth/phones.png";
import show from "../assets/auth/show.svg";
import hide from "../assets/auth/hide.svg";
import { login } from "@/utils/https/auth";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

function Login() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [msgFetch, setMsgFetch] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    if (value) {
      setInput(true);
    } else {
      setInput(false);
    }
    if (name === "email") setInvalid(false);
    setForm((form) => {
      return { ...form, [name]: value };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await login(form, controller);
      console.log(result);
      if (result.status === 200) {
        setLoading(false);
        console.log("SUKSES");
        router.push("/pin");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          setMsgFetch("Email / Password Invalid");
        }
        if (error.response.status === 404) {
          setMsgFetch(error.response.data.msg);
        }
        setInvalid(true);
        setLoading(false);
      }
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigate = (to) => {
    router.push(to);
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
                    value={form.email}
                    onChange={onChangeForm}
                  />
                </span>
              </div>
              <div className="mt-16">
                <span className="relative">
                  <i
                    className={`bi bi-lock-fill text-2xl absolute -top-2 ${
                      input ? "text-primary" : "text-font-placeholder"
                    }`}
                  ></i>
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
                    placeholder="Create your password"
                    className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                      input ? "border-b-primary" : "border-b-font-placeholder"
                    }`}
                    name="password"
                    value={form.password}
                    onChange={onChangeForm}
                  />
                </span>
              </div>
              <p
                className="text-end mt-5 cursor-pointer"
                onClick={() => handleNavigate("/forgot")}
              >
                Forgot password?
              </p>
              <p className="w-full text-center my-5 text-font-error font-semibold">
                {isInvalid && msgFetch}
              </p>
              {isLoading ? (
                <progress className="progress progress-secondary w-full"></progress>
              ) : (
                <button
                  onClick={handleLogin}
                  disabled={
                    isInvalid || form.email === "" || form.password === ""
                  }
                  className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                    input ? "bg-primary text-white" : "bg-secondary"
                  }`}
                >
                  Login
                </button>
              )}
              <p className="text-center mt-10">
                Don’t have an account? Let’s{" "}
                <span
                  className="cursor-pointer text-primary"
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
