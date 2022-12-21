const LinkedIn = ({ credentials }) => {
  const { linkedinClientId, redirectUri } = credentials;

  return (
    <div>
      <a
        href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${redirectUri}/api/auth/callback/linkedin&state=state&scope=r_liteprofile%20r_emailaddress%20w_member_social`}
      >
        Connect to LinkedIn
      </a>
    </div>
  );
};

export default LinkedIn;
