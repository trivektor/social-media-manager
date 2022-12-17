import { CircularProgress } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { Fragment, useEffect } from "react";

const AuthProtected = ({ children }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!isUser) signIn();
  }, [isUser, status]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (isUser) {
    return children;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthProtected;
