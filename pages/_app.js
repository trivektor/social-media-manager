import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import AuthProtected from "../components/auth-protected";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#eee",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Layout>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {Component.auth ? (
                <AuthProtected>
                  <Component {...pageProps} />
                </AuthProtected>
              ) : (
                <Component {...pageProps} />
              )}
            </LocalizationProvider>
          </ThemeProvider>
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
