import Image from "next/image";
import user from "../assets/home/user.svg";
import iconLogout from "../assets/home/log-out.svg";
import grid from "../assets/home/grids.svg";
import arrowUp from "../assets/home/arrow-up.svg";
import plus from "../assets/home/plus.svg";
import { logout } from "@/utils/https/auth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { userAction } from "@/redux/slices/auth";
import { useState, useEffect } from "react";

function AsideMenu(props) {
  const userStore = useSelector((state) => state.user);
  // console.log(userStore);
  const token = userStore.token;
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const [showAside, setShowAside] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

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

  useEffect(() => {
    function handleTouchStart(event) {
      setStartX(event.touches[0].clientX);
    }

    function handleTouchEnd(event) {
      setEndX(event.changedTouches[0].clientX);
      handleSwipe();
    }

    function handleSwipe() {
      if (endX - startX > 50) {
        setShowAside((prevState) => !prevState);
      }
      if (startX - endX > 100) {
        setShowAside((prevState) => !prevState);
      }
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [endX, startX]);

  return (
    <aside
      className={`${
        showAside
          ? "flex absolute z-50 transform translate-x-0 h-[43rem] top-24 left-0 lg:hidden"
          : "hidden"
      } select-none lg:flex flex-col justify-between w-[16.875rem] xl:h-[42.375rem] pl-9 py-12 pr-24 bg-white rounded-xl shadow`}
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

        <div className="flex gap-5 cursor-pointer mt-12 relative">
          {props.namePage === "topup" && (
            <div className="border border-l-4 border-l-primary h-full absolute -left-9"></div>
          )}
          <div
            className={`flex gap-4 text-lg text-font-primary-blurs ${
              props.namePage === "topup" && "text-primary"
            }`}
          >
            <i className="bi bi-arrow-up text-2xl"></i>Transfer
          </div>
        </div>

        <div className="flex gap-5 cursor-pointer mt-12 relative">
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
        <div className="w-7 h-7">
          <Image src={iconLogout} alt="logout" />
        </div>
        <p className="text-font-primary-blurs text-lg">Logout</p>
      </div>
    </aside>
  );
}

export default AsideMenu;
