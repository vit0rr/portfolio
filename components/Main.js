import React from "react";
import ClickIcon from './clickIcon'
import Link from 'next/link'

export default function Main() {
  return (
    <section className="text-black body-font lg:pt-20">

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="text-center mb-20">
            {/*<h2 className="text-5xl font-medium title-font text-white mb-4">
              Sobre Mim
            </h2>*/}
            <div className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s text-white">
              <h2 className = "font-medium title-font text-2xl">Oi :)</h2> <br /> <br />
              <span className = "text-lg font-medium">Programo algo mais ou menos desde os meus 11 anos, mas só de uns 3 anos para cá que me dediquei com seriedade em desenvolvimento e curti o Frontend Web. Em 2020 participei do meu primeiro evento de programação Hacktoberfest e consegui concluir com os desafios e ganhar brindes do evento.</span>
            </div>
            <h2 className="text-2xl text-center text-white font-medium title-font pt-5">
              Tecnologias: <br />
            </h2>
            <h2 className="text-blue-500 font-medium pt-2">JavaScript | TypeScript| NextJS | NodeJS | <br/> ReactJS | Bootstrap | CSS | HTML </h2>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-white inline-flex"></div>
            </div>
            <div>
              <h2 className="text-5xl font-medium title-font text-white mb-4 pt-20">
                Projetos
            </h2>
            </div>
            <section className="container mx-auto py-10 md:py-20 antialiased ">
        <section className="grid lg:grid-cols-2 2xl:grid-cols-4 grid-cols-1 gap-8">
            <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
               
                <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                  <a href="https://github.com/vit0rr/DiscordDMNuke" target="_blank"><ClickIcon></ClickIcon> DiscordDMNuke</a>
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                    Script desenvolvido em JavaScript que remove mensagens enviadas via DM no Discord automaticamente.
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                    <a href="https://github.com/vit0rr/phogtech" target="_blank"><ClickIcon></ClickIcon> Phog Tech</a>
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center">
                    Projeto com mais dois amigos onde realizamos serviços de construção/manutenção de websites.
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                    <a href="https://github.com/vit0rr/privacyforall" target="_blank"><ClickIcon></ClickIcon> Privacy For All</a>
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                    Projeto desenvolvido com foco em oferecer alternativas privadas para serviços comuns. 
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                
                <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                <a href="https://github.com/vit0rr/blog" target="_blank"><ClickIcon></ClickIcon> Blog</a>
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                    Meu blog onde posto alguns textos técnicos sobre programação 
                </p>
            </article>
        </section>
    </section>


            
            <h2 className="text-5xl font-medium title-font text-white mb-4 pt-20">
              Serviços
            </h2>
            <section className="container mx-auto py-10 md:py-20 antialiased align-middle inline-block">
        <section className="grid lg:grid-cols-2 2xl:grid-cols-2 grid-cols-1 gap-8">

            <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                    <a href="https://www.brilhodainfancia.com.br/" target="_blank"><ClickIcon></ClickIcon> Brilho da Infância</a>
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                Ecommerce desenvolvido pela Phog Tech onde configuramos desde o DNS e SEO até a loja propriamente dita.
                </p>
            </article>

            <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                
                <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                <a href="https://www.koisinhasdakisy.com.br/" target="_blank"><ClickIcon></ClickIcon> Koisinhas da Kisy</a>
                </h2>
                <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                Ecommerce desenvolvido pela Phog Tech onde configuramos a loja e resolução de bugs, além de SEO.
                </p>
            </article>
        </section>
    </section>
          </div>
        </div>
      </section>
    </section>
  );
}
