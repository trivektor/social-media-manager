import { SessionProvider } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";

import Layout from "../components/layout";
import AuthProtected from "../components/auth-protected";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme();

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
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <Layout>
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
            </Layout>
          </Box>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
