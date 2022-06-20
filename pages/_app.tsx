import type { AppProps } from 'next/app';
import '../styles/globals.css';
import 'highlight.js/styles/github-dark.css';
import { Header, Footer } from 'components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
