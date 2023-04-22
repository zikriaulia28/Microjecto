import Title from "@/components/title";
import Image from "next/image";
import show from "../assets/auth/show.svg";
import hide from "../assets/auth/hide.svg";
import AsideAuth from "@/components/AsideAuth";
import { login } from "@/utils/https/auth";
import { getProfile } from "@/utils/https/user";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { userAction } from "@/redux/slices/auth";
import { useDispatch } from "react-redux";
import PublicRoute from "@/utils/wrapper/publicRoute";

function Login() {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.email === "" || form.password === "") {
        setMsg("Input is required!");
        setInvalid(true);
        setLoading(false);
        return;
      }
      const resultLogin = await login(form, controller);
      // console.log(result.data.data.pin);
      const result = resultLogin.data.data;
      if (resultLogin.status === 200) {
        const resultProfile = await getProfile(
          result.token,
          result.id,
          controller
        );
        setLoading(false);
        if (result.pin === null) {
          router.push("/pin");
        } else {
          router.push("/home");
        }
        console.log(resultProfile);
        dispatch(userAction.loginRedux(result));
        dispatch(userAction.getDataProfile(resultProfile.data.data));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          setMsg("Email / Password Invalid");
        }
        if (error.response.status === 404) {
          setMsg(error.response.data.msg);
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
    <Title title="Login">
      <main className="font-nunitosans">
        <section className="flex">
          <div className="relative hidden lg:grid lg:flex-[2]">
            <AsideAuth />
          </div>
          <div className="lg:flex-1 w-full bg-secondary lg:bg-white  pt-10 lg:pl-12 lg:pr-36 lg:py-28 ">
            <h1 className="hidden lg:flex text-font-primary text-2xl font-bold">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </h1>
            <p className="hidden lg:flex text-font-primary-blur mt-7">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
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
                {isInvalid && msg}
              </p>
              {isLoading ? (
                <progress className="progress progress-secondary w-full"></progress>
              ) : (
                <button
                  onClick={handleLogin}
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
    </Title>
  );
}

export default PublicRoute(Login);
