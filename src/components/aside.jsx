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

function Aside(props) {
  const userStore = useSelector((state) => state.user);
  console.log(userStore);
  const token = userStore.token;
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();

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
    <aside className="hidden lg:flex flex-col justify-between w-[16.875rem] h-[42.375rem] pl-9 py-12 pr-24 bg-white rounded-xl shadow-lg">
      <div>
        <div
          className="flex gap-5 cursor-pointer relative"
          onClick={() => router.push("/dashboard")}
        >
          <div className="border border-l-4 border-l-primary h-full absolute -left-9"></div>
          <div className="w-7 h-7">
            <Image src={grid} alt="grid" />
          </div>
          <p className="text-primary text-lg">Dashboard</p>
        </div>

        <div className="flex gap-5 cursor-pointer mt-12">
          <div className="w-7 h-7">
            <Image src={arrowUp} alt="arrowUp" />
          </div>
          <p className="text-font-primary-blurs text-lg">Transfer</p>
        </div>

        <div className="flex gap-5 cursor-pointer mt-12">
          <div className="w-7 h-7">
            <Image src={plus} alt="plus" />
          </div>
          <p className="text-font-primary-blurs text-lg">Top Up</p>
        </div>

        <div
          className="flex gap-5 cursor-pointer mt-12"
          onClick={() => router.push(`/profile/${userStore.data.id}`)}
        >
          <div className="w-7 h-7">
            <Image src={user} alt="user" />
          </div>
          <p className="text-font-primary-blurs text-lg">Profile</p>
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

export default Aside;
