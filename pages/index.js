import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import React from "react";
import Services from "../components/Services";
import Projects from '../components/Projects'
import Introduction from "../components/Introduction";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home: Portfolio"
        description="Vitor S. Portfolio"
      />
      <Head>
        <title>Vitor S. Almeida - Portfolio</title>
        <link rel="icon" href="https://raw.githubusercontent.com/vit0rr/portfolio/b7abe202dbd1cec591794b3921b23dbd71ac65bc/img/icons8-naruto.svg" />
      </Head>
      <Header />
      <section className="text-black body-font lg:pt-20">
        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <div className="text-center mb-20">
              <Introduction/>
              <Projects/>
              <Services/>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
