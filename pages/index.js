import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Home from "../components/home";

import Networks from "../components/networks";

const Index = ({ data }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <CircularProgress />;
  }

  return session ? <Networks credentials={data} /> : <Home />;
};

export default Index;

export async function getServerSideProps() {
  const data = {
    twitterClientId: process.env.TWITTER_CLIENT_ID,
    twitterClientSecret: process.env.TWITTER_CLIENT_SECRET,
    redditClientId: process.env.REDDIT_CLIENT_ID,
    redditClientSecret: process.env.REDDIT_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  };

  return {
    props: {
      data,
    },
  };
}
