import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import HomeAuth from "../components/home-auth";
import HomeNoAuth from "../components/home-no-auth";

const Index = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <CircularProgress />;
  }

  return session ? <HomeAuth /> : <HomeNoAuth />;
};

export default Index;
