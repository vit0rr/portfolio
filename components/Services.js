import ClickIcon from "./ClickIcon"

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

                    <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                        <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                            <a href="https://github.com/Phog-Tech/musa-da-mente" target="_blank"><ClickIcon></ClickIcon> Musa da Mente</a>
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