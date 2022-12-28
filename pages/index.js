import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import HomeAuth from "../components/home-auth";
import HomeNoAuth from "../components/home-no-auth";
import { CredentialsContext } from "../context";

const Index = ({ data }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <CircularProgress />;
  }

  return session ? (
    <CredentialsContext.Provider value={data}>
      <HomeAuth />
    </CredentialsContext.Provider>
  ) : (
    <HomeNoAuth />
  );
};

export default Index;

export async function getServerSideProps() {
  const data = {
    twitterClientId: process.env.TWITTER_CLIENT_ID,
    twitterClientSecret: process.env.TWITTER_CLIENT_SECRET,
    redditClientId: process.env.REDDIT_CLIENT_ID,
    redditClientSecret: process.env.REDDIT_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
    linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  };

  return {
    props: {
      data,
    },
  };
}
