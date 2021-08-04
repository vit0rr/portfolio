import ClickIcon from './ClickIcon'

export default function Projects () {
    return (
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
                        Meu blog onde posto alguns textos técnicos sobre programação.
                    </p>
                </article>
            </section>

            <section className="grid lg:grid-cols-2 2xl:grid-cols-2 grid-cols-1 gap-8 pt-4">
                <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">
                    <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                        <a href="https://github.com/vit0rr/FlappyJS" target="_blank"><ClickIcon></ClickIcon> FlappyJS</a>
                    </h2>
                    <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                        Jogo do Flappy Bird utilizando Canvas.
                    </p>
                </article>

                <article className="mx-auto max-w-sm pb-8 bg-black bg-opacity-50 bg-center  transform duration-500 hover:-translate-y-1 shadow-2xl rounded-xl">

                    <h2 className="text-purple-600 hover:text-purple-700 text-center text-2xl mt-8 font-bold min-h-18 px-12">
                        <a href="https://github.com/vit0rr/SnakeJS" target="_blank"><ClickIcon></ClickIcon> SnakeJS</a>
                    </h2>
                    <p className="m-4 text-lg p-4 leading-relaxed text-center ">
                        Snake Game desenvolvido em JavaScript.
                    </p>
                </article>
            </section>
        </section>
    )
}