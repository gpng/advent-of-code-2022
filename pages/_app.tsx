import "@fontsource/roboto-mono";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>
        {`
          body {
            font-family: "Roboto Mono";
          }
        `}
      </style>
    </>
  );
}
