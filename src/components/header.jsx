import placeholder from "../assets/header/Placeholder.png";
import Image from "next/image";
import notification from "../assets/header/bell.svg";

function Header() {
  return (
    <>
      <nav className="px-36 py-12 bg-white rounded-b-2xl shadow-xl">
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
              <p className="font-bold text-lg">Robert Chandler</p>
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
