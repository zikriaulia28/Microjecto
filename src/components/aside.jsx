import Image from "next/image";
import user from "../assets/home/user.svg";
import logout from "../assets/home/log-out.svg";
import grid from "../assets/home/grids.svg";
import arrowUp from "../assets/home/arrow-up.svg";
import plus from "../assets/home/plus.svg";
import { useRouter } from "next/router";

function Aside() {
  const router = useRouter();
  const handleNavigate = (to) => {
    router.push(to);
  };
  return (
    <aside className="hidden lg:flex flex-col justify-between w-[16.875rem] h-[42.375rem] pl-9 py-12 pr-24 bg-white rounded-xl shadow-lg">
      <div>
        <div className="flex gap-5 cursor-pointer relative">
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
          onClick={() => handleNavigate("/profile")}
        >
          <div className="w-7 h-7">
            <Image src={user} alt="user" />
          </div>
          <p className="text-font-primary-blurs text-lg">Profile</p>
        </div>
      </div>
      <div className="flex gap-5 cursor-pointer">
        <div className="w-7 h-7">
          <Image src={logout} alt="logout" />
        </div>
        <p className="text-font-primary-blurs text-lg">Logout</p>
      </div>
    </aside>
  );
}

export default Aside;
