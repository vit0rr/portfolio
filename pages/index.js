import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <div className="text-white bg-#181a1b">
      <NextSeo
        title="Home: Portfolio"
        description="Vitor S. Portfolio"
      />
      <Head>
        <title>Vitor S. Almeida - Portfolio</title>
        <link rel="icon" href="https://github.com/vit0rr/portfolio/img/icons8-naruto.svg" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
