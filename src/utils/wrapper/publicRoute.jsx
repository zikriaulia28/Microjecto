import Spinner from "@/components/spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function PublicRoute(WrappedComponent) {
  const Auth = (props) => {
    const isToken = useSelector((state) => state.user.token);
    const router = useRouter();

    useEffect(() => {
      if (isToken) {
        router.push("/home");
      }
    }, [isToken, router]);

    if (!isToken) {
      return <WrappedComponent {...props} />;
    }
    return <Spinner />;
  };
  return Auth;
}

export default PublicRoute;
