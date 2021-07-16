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
        <link rel="icon" href="https://raw.githubusercontent.com/vit0rr/portfolio/b7abe202dbd1cec591794b3921b23dbd71ac65bc/img/icons8-naruto.svg"/>
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
