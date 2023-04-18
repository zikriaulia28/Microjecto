import Title from "@/components/title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/aside";
import PersonalInfo from "@/components/personalInfo";
import ChangePassword from "@/components/changePassword";
import ChangePin from "@/components/changePin";

import { useState } from "react";

function Profile() {
  const [personalInfo, setPersonalInfo] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changePin, setChangePin] = useState(false);

  const handlerPersonal = () => {
    setPersonalInfo(true);
  };

  const handlerPassword = () => {
    setChangePassword(true);
  };

  const handlerPin = () => {
    setChangePin(true);
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
                    onClick={handlerPhone}
                  >
                    <p className="font-bold">Logout</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default Profile;
