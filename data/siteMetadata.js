const siteMetadata = {
  title: "Vitor's Blog",
  author: 'Vitor S. Almeida',
  headerTitle: "Vitor's Blog",
  description: `I'm a developer who loves building cool stuff on the web. 
    I work with ReactJS, Typescript, Relay and GraphQL, but I also have a
    passion for diving into theoretical topics like type theory and compilers.`,
  language: 'pt-br',
  siteUrl: 'https://vitorsalmeida.com',
  siteRepo: 'https://github.com/vit0rr/portfolio',
  siteLogo: 'https://avatars.githubusercontent.com/u/70543018?v=4',
  image: '/static/images/resume.png',
  socialBanner: '/static/images/resume.png',
  email: 'vi.souza.almeida@protonmail.com',
  github: 'https://github.com/vit0rr',
  twitter: '@vit0rrk',
  linkedin: 'https://www.linkedin.com/in/vitorsalmeida/',
  work: 'https://bemtevi.com/',
  locale: 'en-US',
  analytics: {
    plausibleDataDomain: 'vitorsalmeida.com',
    simpleAnalytics: true,
    googleAnalyticsId: '',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
    utterancesConfig: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: '',
      label: '',
      theme: '',
      darkTheme: '',
    },
    disqus: {
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    },
  },
}

module.exports = siteMetadata
