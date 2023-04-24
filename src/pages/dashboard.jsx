import Title from "@/components/Title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Aside from "@/components/AsideMenu";
import placeholder from "../assets/header/Placeholder.png";
import { getDashboard } from "@/utils/https/user";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const controller = useMemo(() => new AbortController(), []);
  const userStore = useSelector((state) => state.user);
  const token = userStore.token;
  const userId = userStore.data.id;
  const [dataDashboard, setDataDashboard] = useState({});

  const fetching = async () => {
    try {
      const result = await getDashboard(token, userId, controller);
      console.log(result.data.data);
      setDataDashboard(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <Title title="Dashboard">
      <Header />
      <main className="flex gap-5 px-36 py-10 bg-secondary">
        <Aside />
        <section className="flex flex-col gap-5">
          <div className="flex justify-between bg-primary rounded-lg shadow-xl p-8 w-[48.5rem]">
            <div className="flex flex-col gap-6">
              <p className="text-font-secondary-blur">Balance</p>
              <p className="text-4xl text-white">
                Rp.
                {(userStore.data.balance &&
                  userStore.data.balance.toLocaleString("id-ID")) ||
                  0}
              </p>
              <p className="text-font-secondary-blur">
                {userStore.data.phone || "-"}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button className="flex border bg-white opacity-20 px-7 py-4 gap-3 rounded-xl">
                <i className="bi bi-arrow-up mr-2"></i>
                <p>Transfer</p>
              </button>
              <button className="flex border bg-white opacity-20 px-7 py-4 gap-3 rounded-xl">
                <i className="bi bi-plus-lg mr-2"></i>
                <p>Top Up</p>
              </button>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="bg-white w-[25rem] h-[28.4rem] rounded-xl shadow-lg p-8">
              <div className="flex justify-between">
                <div>
                  <i className="bi bi-arrow-down text-xl text-green-600 mr-2"></i>
                  <p>Income</p>
                  <p>Rp2.120.000</p>
                </div>
                <div>
                  <i className="bi bi-arrow-up mr-2 text-xl text-red-600"></i>
                  <p>Expense</p>
                  <p>Rp2.120.000</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 bg-white w-[22rem] h-[28.4rem] rounded-xl shadow-lg p-8 overflow-y-auto ">
              <h2>Transaction History</h2>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-14 h-14">
                    <Image
                      src={placeholder}
                      alt="placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p>Samuel Suhi</p>
                    <p className="text-sm text-font-primary-blur mt-2">
                      Accept
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#1EC15F]">+Rp50.000</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-14 h-14">
                    <Image
                      src={placeholder}
                      alt="placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p>Samuel Suhi</p>
                    <p className="text-sm text-font-primary-blur mt-2">
                      Accept
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#1EC15F]">+Rp50.000</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-14 h-14">
                    <Image
                      src={placeholder}
                      alt="placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p>Samuel Suhi</p>
                    <p className="text-sm text-font-primary-blur mt-2">
                      Accept
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#1EC15F]">+Rp50.000</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-14 h-14">
                    <Image
                      src={placeholder}
                      alt="placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p>Samuel Suhi</p>
                    <p className="text-sm text-font-primary-blur mt-2">
                      Accept
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#1EC15F]">+Rp50.000</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-14 h-14">
                    <Image
                      src={placeholder}
                      alt="placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p>Samuel Suhi</p>
                    <p className="text-sm text-font-primary-blur mt-2">
                      Accept
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#1EC15F]">+Rp50.000</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default Dashboard;
