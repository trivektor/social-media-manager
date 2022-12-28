import { Button, Paper, Typography, Box } from "@mui/material";
import { find } from "lodash";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { CredentialsContext } from "../context";
import RedditIcon from "@mui/icons-material/Reddit";

const Reddit = () => {
  const credentials = useContext(CredentialsContext);
  const { redditClientId, redirectUri } = credentials;
  const queryClient = useQueryClient();
  const { data } = useQuery("networks");
  const connectedToReddit = find(data, { name: "Reddit" });
  const onConnect = () => {
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${redditClientId}&response_type=code&state=state&redirect_uri=${redirectUri}/api/auth/callback/reddit&duration=permanent&scope=identity edit flair history read vote wikiread wikiedit`;
  };
  const onDisconnect = async () => {
    await fetch("/api/auth/invalidate_token/reddit", {
      method: "POST",
    });

    queryClient.invalidateQueries("networks");
  };

  return (
    <Paper square elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }}>
          <RedditIcon />
        </Typography>
        <Typography sx={{ textAlign: "center" }}>Reddit</Typography>
        {connectedToReddit ? (
          <Button
            disableElevation
            variant="contained"
            color="error"
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

export default Reddit;
