import { Fragment, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { styled } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer as MuiDrawer,
  List,
  Divider,
  Container,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  LockOpen as LockOpenIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import Link from "next/link";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
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
      </AppBar>{" "}
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemText>
              <Link href="/posts">Posts</Link>
            </ListItemText>
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListItemButton>
            <ListItemText>
              <Link href="/networks">Networks</Link>
            </ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ mt: 8, height: "100vh", overflow: "auto" }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Fragment>
  );
};

export default Layout;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
