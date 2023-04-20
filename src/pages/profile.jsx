import Title from "@/components/title";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";
import PersonalInfo from "@/components/personalInfo";
import ChangePassword from "@/components/changePassword";
import ChangePin from "@/components/changePin";
import { logout } from "@/utils/https/auth";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Modal from "@/components/modal";

function Profile() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changePin, setChangePin] = useState(false);
  const [modal, setModal] = useState(false);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;

  const handlerPersonal = () => {
    setPersonalInfo(true);
  };

  const handlerPassword = () => {
    setChangePassword(true);
  };

  const handlerPin = () => {
    setChangePin(true);
  };

  const handlerLogout = async () => {
    setModal(true);
    try {
      const result = await logout(token, controller);
      console.log(result);
      if (result.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Title title={"Profile"}>
      <Header />
      <main className="flex gap-5 px-36 py-10 bg-secondary font-nunitosans">
        <Aside />

        <section>
          {personalInfo && <PersonalInfo />}
          {changePassword && <ChangePassword />}
          {changePin && <ChangePin />}

          {!personalInfo && !changePassword && !changePin && (
            <>
              <div className="flex flex-col items-center  pt-12 w-[53.125rem] h-[42.375rem] bg-white rounded-xl shadow-lg px-52">
                <div className="w-20 h-20 bg-slate-400 rounded-xl"></div>
                <div className="flex gap-3 mt-3">
                  <i className="bi bi-pencil"></i>
                  <p>Edit</p>
                </div>
                <div className="text-center mt-4">
                  <p className="font-bold text-2xl">Robert Chandler</p>
                  <p className="mt-3 text-base text-font-primary-blur">
                    +62 813-9387-7946
                  </p>
                </div>
                <div className="flex flex-col gap-5 mt-12">
                  <button
                    className="flex justify-between w-[26rem] bg-secondary py-4 px-5 rounded-xl"
                    onClick={handlerPersonal}
                  >
                    <p className="font-bold">Personal Information</p>
                    <i className="bi bi-arrow-right text-lg"></i>
                  </button>
                  <button
                    className="flex justify-between w-[26rem] bg-secondary py-4 px-5 rounded-xl"
                    onClick={handlerPassword}
                  >
                    <p className="font-bold">Change Password</p>
                    <i className="bi bi-arrow-right text-lg"></i>
                  </button>
                  <button
                    className="flex justify-between w-[26rem] bg-secondary py-4 px-5 rounded-xl"
                    onClick={handlerPin}
                  >
                    <p className="font-bold">Change PIN</p>
                    <i className="bi bi-arrow-right text-lg"></i>
                  </button>
                  <button
                    className="flex justify-between w-[26rem] bg-secondary py-4 px-5 rounded-xl"
                    onClick={handlerLogout}
                  >
                    <p className="font-bold">Logout</p>
                  </button>
                </div>
              </div>
            </>
          )}
          <Modal />
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default Profile;
