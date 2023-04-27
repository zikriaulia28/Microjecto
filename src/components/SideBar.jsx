import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleAction } from "@/redux/slices/action";
import TopUp from "./TopUp";
import Logout from "./LogoutModal";

function AsideMenu(props) {
  const userStore = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isTopup, setIsTopup] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const handleToggleClose = () => {
    dispatch(toggleAction.resetToggle());
  };

  return (
    <>
      <TopUp isOpen={isTopup} onClose={() => setIsTopup(false)} />
      <aside
        className={`hidden select-none lg:flex flex-col justify-between w-[16.875rem] xl:h-[42.375rem] pl-9 py-12 pr-24 bg-white rounded-xl shadow`}
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
              setIsTopup(!isTopup);
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
        <div
          className="flex gap-5 cursor-pointer"
          onClick={() => {
            handleToggleClose();
            setIsLogout(true);
          }}
        >
          <div className="flex gap-4 text-lg text-font-primary-blurs hover:text-primary">
            <i className="bi bi-box-arrow-right text-2xl"></i> Logout
          </div>
        </div>
      </aside>
      <Logout
        logoutOpen={isLogout}
        logoutClose={() => {
          handleToggleClose;
          setIsLogout(false);
        }}
      />
    </>
  );
}

export default AsideMenu;
