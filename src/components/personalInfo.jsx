import EditPhone from "@/components/editPhone";
import { useState } from "react";

function PersonalInfo() {
  const [manage, setManage] = useState(false);

  const handlerManage = () => {
    setManage(true);
  };

  return (
    <>
      {manage ? (
        <EditPhone />
      ) : (
        <div className="flex flex-col p-8 w-[53.125rem] h-[42.375rem] bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-lg">Personal Information</h1>
          <p className="w-[21.375rem] text-font-primary-blur mt-6">
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </p>
          <div className="flex flex-col gap-5 mt-10">
            <div className="shadow-xl p-4 rounded-2xl">
              <p className="text-font-primary-blur text-base">First Name</p>
              <p className="font-bold text-2xl">Robert</p>
            </div>
            <div className="shadow-xl p-4 rounded-2xl">
              <p className="text-font-primary-blur text-base">Last Name</p>
              <p className="font-bold text-2xl">Chandler</p>
            </div>
            <div className="shadow-xl p-4 rounded-2xl">
              <p className="text-font-primary-blur text-base">
                Verified E-mail
              </p>
              <p className="font-bold text-2xl">pewdiepie1@gmail.com</p>
            </div>
            <div className="flex justify-between items-center shadow-xl p-4 rounded-2xl">
              <div>
                <p className="text-font-primary-blur text-base">Phone Number</p>
                <p className="font-bold text-2xl">+62 813-9387-7946</p>
              </div>
              <p
                className="text-primary font-semibold cursor-pointer"
                onClick={handlerManage}
              >
                Manage
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PersonalInfo;
