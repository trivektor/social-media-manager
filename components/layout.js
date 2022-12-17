import { useSession, signIn, signOut } from "next-auth/react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const navbar = (
    <AppBar
      sx={{
        bgcolor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        color: "black",
      }}
    >
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Social Media Manager
          </Typography>
        </Link>

        <Fragment>
          {session ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <PersonIcon />
              <Box sx={{ ml: 1, mr: 1 }}>{session.user.email}</Box>
              <IconButton onClick={signOut} title="Logout">
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={signIn} title="Login">
              <LockOpenIcon />
            </IconButton>
          )}
        </Fragment>
      </Toolbar>
    </AppBar>
  );

  return (
    <Fragment>
      {navbar}
      <Box sx={{ mt: 8 }}>{children}</Box>
    </Fragment>
  );
};

export default Layout;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));
