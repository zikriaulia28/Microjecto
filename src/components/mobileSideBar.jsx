import Image from "next/image";
import { logout } from "@/utils/https/auth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { userAction } from "@/redux/slices/auth";
import { useState, useEffect } from "react";
import { toggleAction } from "@/redux/slices/action";
import TopUp from "./TopUp";

function MobileSideBar(props) {
  const userStore = useSelector((state) => state.user);
  // console.log(userStore);
  const token = userStore.token;
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const [showAside, setShowAside] = useState(false);
  const [openTopup, setOpenTopup] = useState(false);

  const handleToggleClose = () => {
    dispatch(toggleAction.resetToggle());
  };

  console.log(showAside);
  const handlerLogout = async () => {
    try {
      const result = await logout(token, controller);
      console.log(result);
      if (result.status === 200) {
        dispatch(userAction.logoutRedux());
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopUp isOpen={openTopup} onClose={() => setOpenTopup(false)} />
      <aside
        className={`absolute h-screen z-50 left-0 top-0 lg:hidden select-none flex flex-col justify-between w-[16.875rem] xl:h-[42.3rem] pl-9 py-12 pr-24 bg-white rounded-xl shadow transition-all ease-in-out`}
      >
        <div>
          <div
            className="flex gap-5 cursor-pointer relative"
            onClick={() => router.push("/dashboard")}
          >
            {props.namePage === "dashboard" && (
              <div className="border border-l-4 border-l-primary h-full absolute -left-9"></div>
            )}
            <div
              className={`flex gap-4 text-lg text-font-primary-blurs ${
                props.namePage === "dashboard" && "text-primary"
              }`}
            >
              <i className="bi bi-grid text-2xl"></i>Dashboard
            </div>
          </div>

          <div
            className="flex gap-5 cursor-pointer mt-12 relative"
            onClick={() => router.push("/transfer")}
          >
            {props.namePage === "transfer" && (
              <div className="border border-l-4 border-l-primary h-full absolute -left-9"></div>
            )}
            <div
              className={`flex gap-4 text-lg text-font-primary-blurs ${
                props.namePage === "transfer" && "text-primary"
              }`}
            >
              <i className="bi bi-arrow-up text-2xl"></i>Transfer
            </div>
          </div>

          <div
            className="flex gap-5 cursor-pointer mt-12 relative"
            onClick={() => {
              handleToggleClose();
              setOpenTopup(!openTopup);
            }}
          >
            {props.namePage === "topup" && (
              <div className="border border-l-4 border-l-primary h-full absolute -left-9"></div>
            )}
            <div
              className={`flex gap-4 text-lg text-font-primary-blurs ${
                props.namePage === "topup" && "text-primary"
              }`}
            >
              <i className="bi bi-plus-lg text-2xl"></i>Top Up
            </div>
          </div>

          <div
            className="flex gap-5 cursor-pointer mt-12 relative"
            onClick={() => router.push(`/profile/${userStore.data.id}`)}
          >
            {props.namePage === "profile" && (
              <div className="border border-l-4 border-l-primary h-full absolute -left-9"></div>
            )}
            <div
              className={`flex gap-4 text-lg text-font-primary-blurs ${
                props.namePage === "profile" && "text-primary"
              }`}
            >
              <i className="bi bi-person text-2xl"></i>Profile
            </div>
          </div>
        </div>
        <div className="flex gap-5 cursor-pointer" onClick={handlerLogout}>
          <div className="flex gap-4 text-lg text-font-primary-blurs hover:text-primary">
            <i className="bi bi-box-arrow-right text-2xl"></i> Logout
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileSideBar;
