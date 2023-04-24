import { useEffect, useState } from "react";
import Loader from "../Loader";
import { getHistories } from "@/utils/https/history";
import Image from "next/image";
import placeholder from "../../assets/header/Placeholder.png";

function HistoryDashboard({ token, controller }) {
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
        <Loader />
      ) : (
        <div>
          {dataHistory.map((item) => (
            <div
              className="flex justify-between mb-8 items-center"
              key={item.id}
            >
              <div className="flex  gap-4">
                <div className="w-14 h-14">
                  <Image
                    src={item.image ? imgUrl + item.image : placeholder}
                    alt="profile"
                    width={50}
                    height={50}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div>
                  <p>{item.fullName}</p>
                  <p className="text-sm text-font-primary-blur mt-2">
                    {item.type}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className={`${
                    item.type === "accept" || item.type === "topup"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-bold ml-auto`}
                >
                  {item.type === "accept" || item.type === "topup" ? "+" : "-"}
                  {"Rp. "}
                  {item.amount.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HistoryDashboard;
