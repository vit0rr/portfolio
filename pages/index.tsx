import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { PostFrontMatter } from 'types/PostFrontMatter'

const MAX_DISPLAY = 5

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
}

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col md:flex-row md:items-center pt-6 pb-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Vitor S. Almeida
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 pt-5">
              {siteMetadata.description}
            </p>
          </div>
          <div
            className="
        hidden md:block
        md:ml-auto
          "
          >
            <Image
              className="rounded-full w-48 h-48 object-cover"
              src={siteMetadata.siteLogo}
              alt="Vitor S. Almeida"
              width={192}
              height={192}
            />
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, title, summary, tags, images } = frontMatter
            return (
              <>
                <li
                  key={slug}
                  className="py-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-103"
                >
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0">
                      <dl>
                        <div className="justify-center mr-5 drop-shadow-md block hidden xl:block">
                          <Image
                            src={images}
                            key={images}
                            width={256}
                            height={158.75}
                            alt="preview"
                            className="rounded"
                          />
                        </div>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100 dark:hover:text-gray-400 hover:text-gray-500"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                            aria-label={`Read "${title}"`}
                          >
                            See more <span className="font-bold">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              </>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
