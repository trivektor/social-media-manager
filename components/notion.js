import { useContext } from "react";
import { find } from "lodash";
import { CredentialsContext } from "../context";
import { useQuery, useQueryClient } from "react-query";
import { Button, Paper, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Box } from "@mui/system";

const Notion = () => {
  const credentials = useContext(CredentialsContext);
  const { notionClientId, redirectUri } = credentials;
  const queryClient = useQueryClient();
  const { data } = useQuery("networks");
  const connectedToNotion = !!find(data, { name: "Notion" });
  const onConnect = () => {
    window.location.href = `https://api.notion.com/v1/oauth/authorize?client_id=${notionClientId}&response_type=code&owner=user&redirect_uri=${redirectUri}/api/auth/callback/notion`;
  };
  const onDisconnect = async () => {
    await fetch("/api/auth/invalidate_token/notion", {
      method: "POST",
    });

    queryClient.invalidateQueries("networks");
  };

  return (
    <Paper square elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }}>
          <img src="https://img.icons8.com/glyph-neue/24/notion.png" />
        </Typography>
        <Typography sx={{ textAlign: "center" }}>Notion</Typography>
        {connectedToNotion ? (
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

export default Notion;
