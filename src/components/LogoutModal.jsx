import { userAction } from "@/redux/slices/auth";
import { logout } from "@/utils/https/auth";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Logout({ logoutOpen, logoutClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout(token, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        dispatch(userAction.logoutRedux());
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickChild = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      {logoutOpen && (
        <section
          onClick={logoutClose}
          className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50 z-50"
        >
          <div
            onClick={handleClickChild}
            className="w-4/5 md:w-[30%] p-5 md:p-10 flex flex-col bg-white rounded-2xl"
          >
            <button
              type="button"
              onClick={logoutClose}
              className="btn btn-circle border border-red-500  text-red-500 bg-white hover:bg-red-500 hover:border-red-500 hover:text-white ml-auto"
            >
              <i className="bi bi-x text-4xl"></i>
            </button>
            <p className="text-xl text-center font-bold py-4 px-0">
              Do you really want to log out?
            </p>
            <div className="w-full flex">
              {isLoading ? (
                <progress className="progress progress-secondary w-full"></progress>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex-1 border border-primary hover:bg-primary py-2 rounded-xl hover:text-white cursor-pointer"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Logout;
