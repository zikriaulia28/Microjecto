import placeholder from "../assets/header/Placeholder.png";
import Image from "next/image";
import notification from "../assets/header/bell.svg";
import { useSelector } from "react-redux";

function Header() {
  const token = useSelector((state) => state.user.token);
  // console.log(token);
  const firstname = useSelector((state) => state.user.data.firstName);
  const lastname = useSelector((state) => state.user.data.lastName);
  const name = `${firstname} ${lastname}`;
  console.log(name);
  return (
    <>
      <nav
        className={`px-4 xl:px-36 py-12 bg-white rounded-b-2xl ${
          token ? "shadow-xl" : "shadow-none"
        } `}
      >
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text-primary">FazzPay</h1>
          <div className="flex gap-6 items-center">
            <div className="w-12 h-12 rounded-xl">
              <Image
                src={placeholder}
                alt="profile"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <p className="font-bold text-lg">{name}</p>
              <p className="text-font-primary-blur">+62 8139 3877 7946</p>
            </div>
            <div className="w-6 h-6">
              <Image src={notification} alt="notification" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
