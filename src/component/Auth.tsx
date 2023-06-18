import { useNavigate } from "react-router-dom";
import { GetJWTCookie } from "../util/util";

export const IsAuth = () => {
  const navigate = useNavigate();
  return (
    <>{GetJWTCookie(document.cookie) ? <>{navigate("/product")}</> : <></>}</>
  );
};

export const NotAuth = () => {
  const navigate = useNavigate();
  return (
    <>{!GetJWTCookie(document.cookie) ? <>{navigate("/login")}</> : <></>}</>
  );
};
