import Twitter from "./twitter";
import Reddit from "./reddit";
import LinkedIn from "./linkedin";
import { useQuery } from "react-query";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";

const Networks = () => {
  const { isLoading, data } = useQuery("networks", async () => {
    const response = await fetch("/api/networks");
    const { networks } = await response.json();

    return networks;
  });

  if (isLoading) {
    return <LoadingButton loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Twitter />
      </Grid>
      <Grid item>
        <Reddit />
      </Grid>
      <Grid item>
        <LinkedIn />
      </Grid>
    </Grid>
  );
};

export default Networks;
