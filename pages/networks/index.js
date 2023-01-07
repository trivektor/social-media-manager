import Networks from "../../components/networks";
import { CredentialsContext } from "../../context";

const Index = ({ data }) => {
  return (
    <CredentialsContext.Provider value={data}>
      <Networks />
    </CredentialsContext.Provider>
  );
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
    wordpressClientId: process.env.WORDPRESS_CLIENT_ID,
    wordpressClientSecret: process.env.WORDPRESS_CLIENT_SECRET,
    notionClientId: process.env.NOTION_CLIENT_ID,
    notionClientSecret: process.env.NOTION_CLIENT_SECRET,
  };

  return {
    props: {
      data,
    },
  };
}
