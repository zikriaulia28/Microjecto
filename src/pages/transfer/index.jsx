import Title from "@/components/Title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/SideBar";
import PrivateRoute from "@/utils/wrapper/privateRoute";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "@/utils/https/transaction";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import CardReceiver from "@/components/Pages/CardReciever";

function Transfer() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user.token);
  const [dataUsers, setDataUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchPar, setSearchPar] = useState("");
  const [metaPage, setMetaPage] = useState(1);
  const [metaLimit, setMetaLimit] = useState(4);
  const [metaSort, setMetaSort] = useState("");
  const [totalPage, setTotalPage] = useState();

  const fetching = async () => {
    setLoading(true);
    router.replace({
      pathname: "/transfer",
      query: {
        limit: metaLimit,
        page: metaPage,
        sort: metaSort,
        search: searchPar,
      },
    });
    const params = {
      page: metaPage,
      limit: metaLimit,
      sort: metaSort,
      search: searchPar,
    };
    try {
      const result = await getUsers(token, params, controller);
      // console.log(result);
      setDataUser(result.data.data);
      setTotalPage(result.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaPage, searchPar, metaSort]);

  const onSearch = debounce((event) => {
    setMetaPage(1);
    setSearchPar(event.target.value);
  }, 700);

  const handlePagination = (info) => {
    if (info === "next") return setMetaPage(metaPage + 1);
    if (info === "prev") return setMetaPage(metaPage - 1);
  };

  return (
    <Title title={"Transfer"}>
      <Header />
      <main className="flex gap-5 px-4 xl:px-20 py-10 bg-secondary font-nunitosans">
        <Aside namePage="transfer" />
        <section className="flex flex-col p-6 w-full xl:h-[42.375rem] bg-white rounded-xl shadow">
          <div className="w-full flex justify-between">
            <h1 className="text-lg font-bold">Search Receiver</h1>
            <div className="dropdown dropdown-end max-w-[46%]">
              <label
                tabIndex={0}
                className="btn btn-sm btn-secondary btn-outline m-1"
              >
                Sort by :{" "}
                {metaSort === "firstName ASC"
                  ? "Name A-Z"
                  : metaSort === "firstName DESC"
                  ? "Name Z-A"
                  : metaSort}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li
                  onClick={() => setMetaSort("")}
                  disabled={metaSort === ""}
                  className={`font-bold ${metaSort === "" && "text-grey"}`}
                >
                  <a>{metaSort === "" ? "---" : "Reset"}</a>
                </li>
                <li
                  onClick={() => setMetaSort("firstName ASC")}
                  className={`font-bold ${
                    metaSort === "firstName ASC" && "text-grey"
                  }`}
                >
                  <a>Name A-Z</a>
                </li>
                <li
                  onClick={() => setMetaSort("firstName DESC")}
                  className={`font-bold ${
                    metaSort === "firstName DESC" && "text-grey"
                  }`}
                >
                  <a>Name Z-A</a>
                </li>
                <li
                  onClick={() => setMetaSort("noTelp ASC")}
                  className={`font-bold ${
                    metaSort === "noTelp ASC" && "text-grey"
                  }`}
                >
                  <a>Phone 0-9</a>
                </li>
                <li
                  onClick={() => setMetaSort("noTelp DESC")}
                  className={`font-bold ${
                    metaSort === "noTelp DESC" && "text-grey"
                  }`}
                >
                  <a>Phone 9-0</a>
                </li>
              </ul>
            </div>
          </div>
          <span className="w-full rounded-lg bg-slate-400/20 px-4 py-3 text-lg mt-4">
            <label htmlFor="search" className="flex">
              <i class="bi bi-search mr-4"></i>
              <input
                type="text"
                id="search"
                name="search"
                onChange={onSearch}
                className="bg-transparent w-full focus:outline-none"
              />
            </label>
          </span>
          <div className="w-full flex flex-col gap-5 md:px-5 py-5">
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center py-10">
                <Loader />
              </div>
            ) : dataUsers.length < 1 ? (
              <p className="text-center text-2xl font-bold my-10">
                Data Not Found
              </p>
            ) : (
              dataUsers.map((user, idx) => (
                <CardReceiver
                  key={idx}
                  userId={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  img={user.image}
                  tlp={user.noTelp}
                />
              ))
            )}
          </div>
          <div className="btn-group m-auto">
            <button
              onClick={() => handlePagination("prev")}
              disabled={metaPage === 1}
              className="btn btn-secondary btn-outline btn-sm"
            >
              Prev
            </button>
            <button className="font-bold px-2">
              Page {metaPage} / {totalPage}
            </button>
            <button
              onClick={() => handlePagination("next")}
              disabled={metaPage === totalPage}
              className="btn btn-secondary btn-outline btn-sm"
            >
              Next
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default PrivateRoute(Transfer);
