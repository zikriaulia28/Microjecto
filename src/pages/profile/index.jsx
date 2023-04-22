import Title from "@/components/title";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";
import { logout } from "@/utils/https/auth";
import { editImage, getProfile } from "@/utils/https/user";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Modal from "@/components/modal";
import placeholder from "../../assets/header/Placeholder.png";
import Image from "next/image";
import Spinner from "@/components/spinner";
import { userAction } from "@/redux/slices/auth";
import { useDispatch } from "react-redux";

function Profile() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [image, setimage] = useState();
  const [save, setSave] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;

  const onChangeFile = (event) => {
    setimage(event.target.files[0]);
    if (image) {
      setSave(true);
    } else {
      setSave(false);
    }
  };

  const handlerSave = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const result = await editImage(token, userId, image, controller);
      console.log(result.data.data);
      if (result.status === 200) {
        setSave(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.msg);
      }
    }
  };

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const result = await getProfile(token, userId, controller);
      // console.log(result.data.data);
      setData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // console.log(image);

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

  const handleNavigate = (to) => {
    router.push(to);
  };
  // console.log(data.image);

  return (
    <Title title={"Profile"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-36 py-10 bg-secondary font-nunitosans">
        <Aside />

        <section className="flex flex-col items-center  pt-12 w-[393px] md:w-[736px] xl:w-[53.125rem] xl:h-[42.375rem] bg-white rounded-xl shadow-lg  pb-10 xl:px-52">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="w-20 h-20 bg-slate-400 rounded-xl">
                <Image
                  src={image ? URL.createObjectURL(image) : placeholder}
                  alt="image"
                  className="w-full h-full object-cover rounded-xl"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex gap-3 mt-3 cursor-pointer relative">
                <i className="bi bi-pencil"></i>
                <p>Edit</p>
                <input
                  type="file"
                  className="absolute cursor-pointer -left-32 opacity-0"
                  onChange={onChangeFile}
                />
                {save && (
                  <button
                    className="absolute z-10 top-5 left-3 cursor-pointer"
                    onClick={handlerSave}
                  >
                    Save
                  </button>
                )}
              </div>
              <div className="text-center mt-4">
                <p className="font-bold text-2xl">{`${data.firstName} ${data.lastName}`}</p>
                <p className="mt-3 text-base text-font-primary-blur">
                  {data.noTelp}
                </p>
              </div>
            </>
          )}
          <div className="flex flex-col gap-5 mt-12 ">
            <button
              className="flex justify-between md:w-[26rem] bg-secondary py-4 px-5 rounded-xl"
              onClick={() => handleNavigate("/profile/personalInfo")}
            >
              <p className="font-bold">Personal Information</p>
              <i className="bi bi-arrow-right text-lg"></i>
            </button>
            <button
              className="flex justify-between md:w-[26rem] bg-secondary py-4 px-5 rounded-xl"
              onClick={() => handleNavigate("/profile/changePassword")}
            >
              <p className="font-bold">Change Password</p>
              <i className="bi bi-arrow-right text-lg"></i>
            </button>
            <button
              className="flex justify-between md:w-[26rem] bg-secondary py-4 px-5 rounded-xl"
              onClick={() => handleNavigate("/profile/changePin")}
            >
              <p className="font-bold">Change PIN</p>
              <i className="bi bi-arrow-right text-lg"></i>
            </button>
            <button
              className="flex justify-between md:w-[26rem] bg-secondary py-4 px-5 rounded-xl"
              onClick={handlerLogout}
            >
              <p className="font-bold">Logout</p>
            </button>
          </div>
        </section>
        <Modal />
      </main>
      <Footer />
    </Title>
  );
}

export default Profile;
