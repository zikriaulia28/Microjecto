import placeholder from "../assets/header/Placeholder.png";
import Image from "next/image";
import notification from "../assets/header/bell.svg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Header() {
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const router = useRouter();
  const dataImage = userStore.data.image;
  const firstname = userStore.data.firstName;
  const lastname = userStore.data.lastName;
  const phone = userStore.data.phone;
  const name = `${firstname} ${lastname}`;
  const [show, setShow] = useState(false);

  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    dataImage;

  const handleShow = () => {
    setShow((prevState) => !prevState);
  };

  const handleNavigate = (to) => {
    router.push(to);
  };

  return (
    <>
      <nav
        className={`px-4 py-6 xl:px-20 xl:py-12   ${
          token ? "shadow bg-white rounded-b-2xl" : " bg-secondary"
        } font-nunitosans `}
      >
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text-primary">FazzPay</h1>
          {token ? (
            <>
              <div className="hidden lg:flex gap-6 items-center">
                <div className="w-12 h-12 rounded-xl">
                  <Image
                    src={imgUrl || placeholder}
                    alt="profile"
                    className="w-full h-full object-cover rounded-xl"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <p className="font-bold text-lg">{name}</p>
                  <p className="text-font-primary-blur">{phone}</p>
                </div>
                <div className="w-6 h-6">
                  <Image src={notification} alt="notification" />
                </div>
              </div>
              <div className="lg:hidden" onClick={handleShow}>
                <i className="bi bi-list text-4xl"></i>
              </div>
              {show && (
                <>
                  <div className="bg-white absolute right-0 z-50 lg:hidden top-20 w-full px-4 py-6 rounded-xl flex flex-row justify-between transition-all">
                    <div className="w-12 h-12 rounded-xl">
                      <Image
                        src={placeholder}
                        alt="profile"
                        className="w-full h-full object-cover rounded-xl"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{name}</p>
                      <p className="text-font-primary-blur">
                        +62 8139 3877 7946
                      </p>
                    </div>
                    <div className="w-6 h-6">
                      <Image src={notification} alt="notification" />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="hidden lg:flex gap-8">
                <button
                  className="border border-primary text-primary py-3 px-9 rounded-xl hover:scale-105"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-primary text-white py-3 px-9 rounded-xl hover:scale-105 hover:bg-blue-400"
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
              <div className="lg:hidden" onClick={handleShow}>
                <i className="bi bi-list text-4xl"></i>
              </div>
              {show && (
                <>
                  <div className="bg-white absolute right-0 z-50 lg:hidden top-20 w-full px-4 py-6 rounded-xl flex flex-col gap-4 transition-all">
                    <button
                      className="border border-primary text-primary py-3 px-9 rounded-xl hover:scale-105"
                      onClick={() => handleNavigate("/login")}
                    >
                      Login
                    </button>
                    <button
                      className="bg-primary text-white py-3 px-9 rounded-xl hover:scale-105 hover:bg-blue-400"
                      onClick={() => handleNavigate("/signup")}
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
