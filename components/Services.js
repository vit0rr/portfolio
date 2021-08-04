
export default function Services() {
    return (
        <>
            <h2 className="text-5xl font-medium title-font text-white mb-4 pt-20">
                Serviços
            </h2>
            <section className="container mx-auto py-10 md:py-20 antialiased align-middle inline-block">
                <section className="grid lg:grid-cols-3 2xl:grid-cols-3 grid-cols-1 gap-8">

                    <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                        <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                            <a href="https://www.brilhodainfancia.com.br/" target="_blank"><div className = "inline"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg></div> Brilho da Infância</a>
                        </h2>
                        <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                            Ecommerce desenvolvido pela Phog Tech onde configuramos desde o DNS e SEO até a loja propriamente dita.
                        </p>
                    </article>

                    <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">

                        <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                            <a href="https://www.koisinhasdakisy.com.br/" target="_blank"><div className = "inline"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg></div> Koisinhas da Kisy</a>
                        </h2>
                        <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                            Ecommerce desenvolvido pela Phog Tech onde configuramos a loja e resolução de bugs, além de SEO.
                        </p>
                    </article>

                    <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                        <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                            <a href="https://github.com/Phog-Tech/musa-da-mente" target="_blank"><div className = "inline"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg></div> Musa da Mente</a>
                        </h2>
                        <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                            Teste de personalidade com front-end em JavaScript e back-end em PHP
                        </p>
                    </article>
                </section>
            </section>
        </>
    )
}