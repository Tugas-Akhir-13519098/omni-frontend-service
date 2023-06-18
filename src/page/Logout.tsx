import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../component/Firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ClearAllCookies } from "../util/util";

export default function Logout() {
  const navigate = useNavigate();
  const toast = useToast();

  const logout = async () => {
    try {
      ClearAllCookies(document.cookie);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Logout",
        description: String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
