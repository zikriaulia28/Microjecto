import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import { useState, useMemo } from "react";
import Aside from "@/components/Aside";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "@/utils/https/user";
import { userAction } from "@/redux/slices/auth";

function PersonalInfo() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;
  const firstName = userStore.data.firstName;
  const lastName = userStore.data.lastName;
  const email = userStore.data.email;
  const phone = userStore.data.phone;
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
  });

  const handleNavigate = (to) => {
    router.push(to);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await editProfile(token, userId, form, controller);
      const firstName = result.data.data.firstName;
      const lastName = result.data.data.lastName;
      if (result.status === 200) {
        console.log(firstName);
        console.log(lastName);
        dispatch(userAction.editNameUser({ firstName, lastName }));
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (form) {
      setShow(true);
    }
  };

  return (
    <Title title={"Personal Info"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-36 py-10 bg-secondary font-nunitosans">
        <Aside />
        <section className="flex flex-col p-6 md:w-[736px] xl:w-[53.125rem] xl:h-[42.375rem] bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-lg">Personal Information</h1>
          <p className="w-[21.375rem] text-font-primary-blur mt-6">
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </p>
          <div className="flex flex-col gap-5 mt-10">
            <div className="shadow-xl p-4 rounded-2xl relative">
              <p className="text-font-primary-blur text-base">First Name</p>
              <input
                type="text"
                id="firstName"
                value={form.firstName}
                name="firstName"
                className="font-bold text-2xl outline-none"
                onChange={handleForm}
              />
            </div>
            <div className="shadow-xl p-4 rounded-2xl relative">
              <p className="text-font-primary-blur text-base">Last Name</p>
              <input
                type="text"
                value={form.lastName}
                name="lastName"
                className="font-bold text-2xl outline-none"
                onChange={handleForm}
              />
              {show && (
                <span
                  onClick={handleSubmit}
                  className="text-lg cursor-pointer absolute right-4 text-primary"
                >
                  Save
                </span>
              )}
            </div>
            <div className="shadow-xl p-4 rounded-2xl">
              <p className="text-font-primary-blur text-base">
                Verified E-mail
              </p>
              <p className="font-bold text-2xl">{email}</p>
            </div>
            <div className="flex justify-between items-center shadow-xl p-4 rounded-2xl">
              <div>
                <p className="text-font-primary-blur text-base">Phone Number</p>
                <p className="font-bold text-2xl">{phone}</p>
              </div>
              <p
                className="text-primary font-semibold cursor-pointer"
                onClick={() => handleNavigate("/profile/edit-phone")}
              >
                Manage
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default PersonalInfo;
