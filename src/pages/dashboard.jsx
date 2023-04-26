import Title from "@/components/Title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/SideBar";
import { getProfile } from "@/utils/https/user";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import HistoryDashboard from "@/components/Pages/HistoryDashboard";
import DashbordDiagram from "@/components/Pages/DashboardDiagram";
import { useDispatch } from "react-redux";
import { userAction } from "@/redux/slices/auth";
import Loader from "@/components/Loader";
import Link from "next/link";
import TopUp from "@/components/TopUp";
import PrivateRoute from "@/utils/wrapper/privateRoute";

function Dashboard() {
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;
  const [isLoading, setLoading] = useState(true);
  const [dataBalance, setDataBalance] = useState({});
  const [isTopup, setIsTopup] = useState(false);

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProfile(token, userId, controller);
      const balance = result.data.data.balance;
      setDataBalance(result.data.data);
      dispatch(userAction.editBalanceRedux(balance));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDataBalance]);
  return (
    <Title title="Dashboard">
      <Header />
      <TopUp isOpen={isTopup} onClose={() => setIsTopup(false)} />
      <main className="flex gap-5 px-4 xl:px-20 py-10 bg-secondary select-none">
        <Aside namePage="dashboard" />
        <section className="flex flex-col gap-5 w-full h-full">
          <div className="flex justify-between bg-primary rounded-lg shadow-xl p-8 w-full xl:w-full">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-col gap-6">
                <p className="text-font-secondary-blur">Balance</p>
                <p className="text-xl font-bold md:text-4xl text-white">
                  Rp.
                  {(userStore.data.balance &&
                    userStore.data.balance.toLocaleString("id-ID")) ||
                    0}
                </p>
                <p className="text-font-secondary-blur">
                  {userStore.data.phone || "-"}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button className="flex border text-white hover:opacity-70 px-7 py-4 gap-3 rounded-xl">
                <Link href={"/transfer"}>
                  <i className="bi bi-arrow-up mr-2 "></i> Transfer
                </Link>
              </button>
              <button
                className="flex border text-white hover:opacity-70 px-7 py-4 gap-3 rounded-xl"
                onClick={() => setIsTopup(true)}
              >
                <i className="bi bi-plus-lg mr-2"></i>
                <p>Top Up</p>
              </button>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="hidden lg:block bg-white xl:w-[60%] xl:h-[28.2rem] rounded-xl shadow p-8">
              <DashbordDiagram
                userId={userId}
                token={token}
                controller={controller}
              />
            </div>
            <div className="flex flex-col gap-10 bg-white w-full xl:w-[40%] h-[28.2rem] rounded-xl shadow p-8">
              <div className="flex justify-between">
                <h2>Transaction History</h2>
                <Link href={"/history"} className="text-primary cursor-pointer">
                  See All
                </Link>
              </div>
              <HistoryDashboard token={token} controller={controller} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default PrivateRoute(Dashboard);
