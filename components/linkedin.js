import { Button, Paper, Typography, Box } from "@mui/material";
import { find } from "lodash";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { CredentialsContext } from "../context";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const LinkedIn = () => {
  const credentials = useContext(CredentialsContext);
  const { linkedinClientId, redirectUri } = credentials;
  const queryClient = useQueryClient();
  const { data } = useQuery("networks");
  const connectedToLinkedIn = !!find(data, { name: "LinkedIn" });
  const onConnect = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${redirectUri}/api/auth/callback/linkedin&state=state&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  };
  const onDisconnect = async () => {
    await fetch("/api/auth/invalidate_token/linkedin", {
      method: "POST",
    });

    queryClient.invalidateQueries("networks");
  };

  return (
    <Paper square elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }}>
          <LinkedInIcon />
        </Typography>
        <Typography sx={{ textAlign: "center" }}>LinkedIn</Typography>
        {connectedToLinkedIn ? (
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

export default LinkedIn;
