import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, Hydrate } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query/";
import { CookiesProvider } from "react-cookie";
import { queryClient } from "@/client/requests/graphqlRequestClient";
import { ToastContainer } from "react-toastify";
import AuthMiddleware from "@/client/middleware/AuthMiddleware";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthMiddleware
            requireAuth={pageProps.requireAuth}
            enableAuth={pageProps.enableAuth}
          >
            <Component {...pageProps} />
          </AuthMiddleware>
          <ToastContainer />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Hydrate>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
