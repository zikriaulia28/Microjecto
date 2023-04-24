import Image from "next/image";
import bg from "../assets/auth/background.png";
import phone from "../assets/auth/phones.png";

function AsideAuth() {
  return (
    <>
      <div className="absolute -z-10 w-full">
        <Image src={bg} alt="background" className="w-full h-full" />
      </div>
      <div className="absolute xl:w-[512px] xl:h-[575px] translate-x-28 translate-y-32 ">
        <Image src={phone} alt="phone" className="w-full h-full object-cover" />
      </div>
      <div className="pl-36 pr-32">
        <h1 className="text-3xl text-font-secondary text mt-12 font-bold font-nunitosans">
          FazzPay
        </h1>
        <div className="mt-[120%] ">
          <p className="text-font-secondary font-bold text-3xl">
            App that Covering Banking Needs.
          </p>
          <p className="text-[#FFFFFFCC] text-base mt-7">
            FazzPay is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registered in FazzPay everyday with worldwide
            users coverage.
          </p>
        </div>
      </div>
    </>
  );
}

export default AsideAuth;
