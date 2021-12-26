import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Pinned articles
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">My favorite articles</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-12">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime="2021-12-24T03:00:00.000Z">Friday, December 24, 2021</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/experience-requirement-is-bullshit`}
                          className="text-gray-900 dark:text-gray-100 dark:hover:text-gray-400 hover:text-gray-500"
                        >
                          Why experience time requirement is bullshit
                        </Link>
                      </h2>
                    </div>
                    <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                      Why experience time requirement is bullshit and you shouldn't care about that
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/blog/experience-requirement-is-bullshit`}
                      className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label={`Read "Why experience time requirement is bullshit"`}
                    >
                      See more &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </>
  )
}
