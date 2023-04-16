import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import grid from "../assets/home/grids.svg";
import arrowUp from "../assets/home/arrow-up.svg";
import plus from "../assets/home/plus.svg";
import user from "../assets/home/user.svg";
import logout from "../assets/home/log-out.svg";
import placeholder from "../assets/header/Placeholder.png";

function Home() {
  return (
    <>
      <Head>
        <title>Fazzpay - Home</title>
      </Head>
      <Header />
      <main className="flex gap-5 px-36 py-10 bg-secondary">
        <aside className="flex flex-col justify-between w-[16.875rem] h-[42.375rem] pl-9 py-12 pr-24 bg-white rounded-xl shadow-lg">
          <div>
            <div className="flex gap-5 cursor-pointer">
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

            <div className="flex gap-5 cursor-pointer mt-12">
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
        <section className="flex flex-col gap-5">
          <div className="flex justify-between bg-primary rounded-lg shadow-xl p-8 w-[48.5rem]">
            <div className="flex flex-col gap-6">
              <p className="text-font-secondary-blur">Balance</p>
              <p className="text-4xl text-white">Rp120.000</p>
              <p className="text-font-secondary-blur">+62 813-9387-7946</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex border bg-white opacity-20 px-7 py-4 gap-3 rounded-xl">
                <div>
                  <Image src={arrowUp} alt="arrowUp" />
                </div>
                <p>Transfer</p>
              </div>
              <div className="flex border bg-white opacity-20 px-7 py-4 gap-3 rounded-xl">
                <div>
                  <Image src={plus} alt="plus" />
                </div>
                <p>Top Up</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="bg-white w-[25rem] h-[28.4rem] rounded-xl shadow-lg p-8">
              dss
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
    </>
  );
}

export default Home;
