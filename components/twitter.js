import { useContext } from "react";
import { find } from "lodash";
import { CredentialsContext } from "../context";
import { useQuery, useQueryClient } from "react-query";
import { Button, Paper, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box } from "@mui/system";

const Twitter = () => {
  const credentials = useContext(CredentialsContext);
  const { twitterClientId, redirectUri } = credentials;
  const queryClient = useQueryClient();
  const { data } = useQuery("networks");
  const connectedToTwitter = !!find(data, { name: "Twitter" });
  const onConnect = () => {
    window.location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirectUri}/api/auth/callback/twitter&scope=tweet.write%20tweet.read%20offline.access%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
  };
  const onDisconnect = async () => {
    await fetch("/api/auth/invalidate_token/twitter", {
      method: "POST",
    });

    queryClient.invalidateQueries("networks");
  };

  return (
    <Paper square elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }}>
          <TwitterIcon />
        </Typography>
        <Typography sx={{ textAlign: "center" }}>Twitter</Typography>
        {connectedToTwitter ? (
          <Button
            disableElevation
            color="error"
            variant="contained"
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
        ) : (
          <Button disableElevation variant="contained" onClick={onConnect}>
            Connect
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Twitter;
