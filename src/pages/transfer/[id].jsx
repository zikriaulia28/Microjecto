import Title from "@/components/Title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/SideBar";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { getProfile } from "@/utils/https/user";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import TransferAmount from "@/components/Pages/TransferAmount";
import TransferConfirm from "@/components/Pages/TransferConfirm";
import placeholder from "../../assets/header/Placeholder.png";

function TransferId() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setLoading] = useState(true);
  const [showTfAmount, setShowTfAmount] = useState(true);
  const [showConfirmation, setShowConfirm] = useState(false);
  const [dataUser, setDataUser] = useState({});

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleChangeAmount = (info) => {
    setAmount(info.amount);
    setNote(info.notes);
    setShowTfAmount(false);
    setShowConfirm(true);
  };

  const fetching = async () => {
    setLoading(true);
    const { id } = router.query;
    try {
      const result = await getProfile(token, id, controller);
      console.log(result);
      setDataUser(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status && error.response.status === 404) {
        router.push("/transfer");
      }
    }
  };
  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    dataUser.image;
  const dataReceiver = {
    id: router.query.id,
    img: dataUser.image ? imgUrl : placeholder,
    userName: dataUser.firstName + " " + dataUser.lastName,
    phone: dataUser.noTelp,
  };

  return (
    <Title title={"Transfer"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-20 py-10 bg-secondary font-nunitosans select-none">
        <Aside namePage="transfer" />
        <section className="flex flex-col p-6 w-full xl:h-[42.375rem] bg-white rounded-xl shadow">
          <div className="flex-1 flex flex-col items-center rounded-3xl bg-white py-7">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="w-full px-5 mr-auto">
                <h1 className="font-bold text-lg mb-5">Transfer Money</h1>
                <span className="w-full flex pl-8">
                  <div className="avatar">
                    <div className="w-[74px] mask mask-squircle">
                      <Image
                        src={dataUser.image ? imgUrl : placeholder}
                        alt="display-profile"
                        width={50}
                        height={50}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pl-5">
                    <h1 className="md:text-lg font-bold">
                      {dataUser.firstName + " " + dataUser.lastName}
                    </h1>
                    <p className="text-grey text-sm md:text-base">
                      {dataUser.noTelp ? dataUser.noTelp : "-"}
                    </p>
                  </div>
                </span>
                {showTfAmount && (
                  <p className="text-grey md:max-w-[400px] my-6">
                    Type the amount you want to transfer and then press continue
                    to the next steps.
                  </p>
                )}
                <TransferAmount
                  isShow={showTfAmount}
                  onClose={handleChangeAmount}
                  amount={amount}
                  note={note}
                />
                <TransferConfirm
                  isShow={showConfirmation}
                  backAmount={() => {
                    setShowConfirm(false);
                    setShowTfAmount(true);
                  }}
                  onClose={() => setShowConfirm()}
                  amount={amount}
                  note={note}
                  dataReceiver={dataReceiver}
                />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default PrivateRoute(TransferId);
