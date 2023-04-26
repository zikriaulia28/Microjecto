import { useEffect, useState } from "react";
import Loader from "../Loader";
import { getHistories } from "@/utils/https/history";
import Image from "next/image";
import placeholder from "../../assets/header/Placeholder.png";

function Notification({ token, controller }) {
  const [isLoading, setLoading] = useState(true);
  const [dataHistory, setDataHistory] = useState([]);

  const fetching = async () => {
    setLoading(true);
    const params = { page: 1, limit: 4, filter: "WEEK" };
    try {
      const result = await getHistories(token, params, controller);
      setDataHistory(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(dataHistory);
  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";

  return (
    <>
      {isLoading ? (
        <div className="hidden">
          <Loader />
        </div>
      ) : (
        <div className="h-fit absolute bg-white shadow top-40 right-20 px-4 pt-6 rounded-lg">
          {dataHistory.map((item) => (
            <div
              className="flex justify-between mb-8 items-center"
              key={item.id}
            >
              <div className="flex  gap-4">
                {item.type === "accept" || item.type === "topup" ? (
                  <i className="bi bi-arrow-down-short text-4xl text-green-500"></i>
                ) : (
                  <i className="bi bi-arrow-up-short text-4xl text-red-500"></i>
                )}

                <div>
                  <p className="w-fit text-font-primary-blur">
                    {(item.type === "topup" && "") ||
                      (item.type === "send" && "Transfer To") ||
                      (item.type === "accept" && "Accept From")}{" "}
                    <span>
                      {item.type === "topup" ? "Top Up" : item.fullName}
                    </span>
                  </p>
                  <p className={`font-bold ml-auto`}>
                    {"Rp. "}
                    {item.amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Notification;
