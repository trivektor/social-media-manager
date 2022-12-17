const Twitter = ({ credentials }) => {
  const { twitterClientId, redirectUri } = credentials;

  return (
    <div>
      <a
        href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirectUri}/api/auth/callback/twitter&scope=tweet.write%20tweet.read%20offline.access%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
      >
        Connect to Twitter
      </a>
    </div>
  );
};

export default Twitter;
