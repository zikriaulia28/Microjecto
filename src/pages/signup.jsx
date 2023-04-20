import Title from "@/components/title";
import AsideAuth from "@/components/AsideAuth";
import Image from "next/image";
import show from "../assets/auth/show.svg";
import hide from "../assets/auth/hide.svg";
import { useRouter } from "next/router";
import { register } from "@/utils/https/auth";
import { useMemo, useState } from "react";

function Signup() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [msg, setMsg] = useState("");
  const [input, setInput] = useState(false);
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

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(form);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        form.email === "" ||
        form.password === "" ||
        form.firstName === "" ||
        form.lastName === ""
      ) {
        setMsg("Input is required!");
        setInvalid(true);
        setLoading(false);
        return;
      }
      if (!emailRegex.test(form.email)) {
        setMsg("Email is invalid!");
        setInvalid(true);
        setLoading(false);
        return;
      }
      if (form.password.length < 4) {
        setMsg("password of at least 4 characters!");
        setInvalid(true);
        setLoading(false);
        return;
      }

      const result = await register(form, controller);
      if (result.status === 200) {
        // console.log(result);
        setLoading(false);
        console.log("SUKSES");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.msg);
        setMsg(error.response.data.msg);
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
    <Title title={"Sign Up"}>
      <main>
        <section className="flex lg:h-[920px]">
          <div className="relative lg:flex-[2]">
            <AsideAuth />
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
                    className={`bi bi-person text-2xl absolute -top-2 ${
                      input ? "text-primary" : "text-font-placeholder"
                    }`}
                  ></i>
                  <input
                    type="text"
                    placeholder="Enter your firstname"
                    className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                      input ? "border-b-primary" : "border-b-font-placeholder"
                    }`}
                    name="firstName"
                    id="firstName"
                    value={form.firstName}
                    onChange={onChangeForm}
                  />
                </span>
              </div>
              <div className="mt-8">
                <span className="relative">
                  <i
                    className={`bi bi-person text-2xl absolute -top-2 ${
                      input ? "text-primary" : "text-font-placeholder"
                    }`}
                  ></i>
                  <input
                    type="text"
                    placeholder="Enter your lastname"
                    className={`placeholder:text-font-placeholder pl-10 border-b-2 w-full py-3 outline-none ${
                      input ? "border-b-primary" : "border-b-font-placeholder"
                    }`}
                    name="lastName"
                    id="lastName"
                    value={form.lastName}
                    onChange={onChangeForm}
                  />
                </span>
              </div>
              <div className="mt-8">
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
              <div className="mt-8">
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
              <p className="w-full text-center my-5 text-font-error font-semibold">
                {isInvalid && msg}
              </p>
              {isLoading ? (
                <progress className="progress progress-secondary w-full"></progress>
              ) : (
                <button
                  onClick={handleSignup}
                  disabled={isInvalid || isLoading}
                  className={`mt-5 text-center py-4 rounded-lg cursor-pointer w-full border-none ${
                    input ? "bg-primary text-white" : "bg-secondary"
                  }`}
                >
                  Sign Up
                </button>
              )}
              <p className="text-center mt-10">
                Don’t have an account? Let’s{" "}
                <span
                  className="cursor-pointer text-primary"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </section>
      </main>
    </Title>
  );
}

export default Signup;
