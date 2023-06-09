import Title from "@/components/Title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/SideBar";
import { editImage, getProfile } from "@/utils/https/user";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import placeholder from "../../assets/header/Placeholder.png";
import Image from "next/image";
import Loader from "@/components/Loader";
import { userAction } from "@/redux/slices/auth";
import { useDispatch } from "react-redux";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import Logout from "@/components/LogoutModal";

function Profile() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const [image, setimage] = useState();
  const [save, setSave] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [update, setUpdate] = useState(false);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;
  const dataImage = userStore.data.image;

  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    dataImage;

  const onChangeFile = (event) => {
    setimage(event.target.files[0]);
    if (event) {
      setSave((prevState) => !prevState);
    }
  };

  const setImgProfile = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    if (dataImage) {
      return imgUrl;
    }
    return placeholder;
  };
  // console.log(image);
  const handlerSave = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!image) {
        console.log("Please select an image to upload");
        setIsLoading(false);
        return;
      }
      const result = await editImage(token, userId, image, controller);
      // console.log(result);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdate(true);
      }
      setSave(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSave(false);
      if (error.response.status === 400) {
        console.log(error.response.data.msg);
      }
      if (error.response.status === 413) {
        console.log(error.response.data.msg);
      }
    }
  };

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const result = await getProfile(token, userId, controller);
      // console.log(result.data.data.image);
      const image = result.data.data.image;
      dispatch(userAction.editImage(image));
      setData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    if (update) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const handleNavigate = (to) => {
    router.push(to);
  };
  // console.log(data.image);

  return (
    <Title title={"Profile"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-20 py-10 bg-secondary font-nunitosans">
        <Aside namePage="profile" />

        <section className="flex flex-col items-center  pt-12 w-full xl:h-[42.375rem] bg-white rounded-xl shadow  pb-10 xl:px-44">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="w-20 h-20 bg-slate-400 rounded-xl">
                <Image
                  src={setImgProfile()}
                  alt="image"
                  className="w-full h-full object-cover rounded-xl"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex gap-3 mt-3 cursor-pointer relative">
                <label htmlFor="inputChange" className="cursor-pointer">
                  <i className="bi bi-pencil"></i> Edit
                  <input
                    type="file"
                    id="inputChange"
                    className=" hidden"
                    onChange={onChangeFile}
                  />
                </label>
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
          <div className="flex flex-col w-4/5 gap-5 mt-12 ">
            <button
              className="flex justify-between w-full bg-secondary py-4 px-5 rounded-xl"
              onClick={() => handleNavigate("/profile/personal-info")}
            >
              <p className="font-bold">Personal Information</p>
              <i className="bi bi-arrow-right text-lg"></i>
            </button>
            <button
              className="flex justify-between w-full bg-secondary py-4 px-5 rounded-xl"
              onClick={() => handleNavigate("/profile/change-password")}
            >
              <p className="font-bold">Change Password</p>
              <i className="bi bi-arrow-right text-lg"></i>
            </button>
            <button
              className="flex justify-between w-full bg-secondary py-4 px-5 rounded-xl"
              onClick={() => handleNavigate("/profile/check-pin")}
            >
              <p className="font-bold">Change PIN</p>
              <i className="bi bi-arrow-right text-lg"></i>
            </button>
            <button
              className="flex justify-between w-full bg-secondary py-4 px-5 rounded-xl"
              onClick={() => setIsLogout(true)}
            >
              <p className="font-bold">Logout</p>
            </button>
          </div>
          <Logout
            logoutOpen={isLogout}
            logoutClose={() => setIsLogout(false)}
          />
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default PrivateRoute(Profile);
