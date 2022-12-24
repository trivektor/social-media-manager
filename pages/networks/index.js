import Networks from "../../components/networks";

const Index = ({ data }) => {
  return <Networks credentials={data} />;
};

Index.auth = true;

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
    instagramAppId: process.env.INSTAGRAM_APP_ID,
    instagramAppSecret: process.env.INSTAGRAM_APP_SECRET,
  };

  return {
    props: {
      data,
    },
  };
}
