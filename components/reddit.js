const Reddit = ({ credentials }) => {
  const { redditClientId, redirectUri } = credentials;

  return (
    <div>
      <a
        href={`https://www.reddit.com/api/v1/authorize?client_id=${redditClientId}&response_type=code&state=state&redirect_uri=${redirectUri}/api/auth/callback/reddit&duration=permanent&scope=identity edit flair history read vote wikiread wikiedit`}
      >
        Connect to Reddit
      </a>
    </div>
  );
};

export default Reddit;
