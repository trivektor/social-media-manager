const Instagram = ({ credentials }) => {
  const { instagramAppId, redirectUri } = credentials;

  return (
    <div>
      <a
        href={`https://api.instagram.com/oauth/authorize?app_id=${instagramAppId}&redirect_uri=${redirectUri}&response_type=code&scope=user_profile,user_media`}
      >
        Connect to Instagram
      </a>
    </div>
  );
};

export default Instagram;
