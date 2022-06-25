export default {
  lang: 'en-US',
  title: 'Bintang Pradana Erlangga Putra',
  titleTemplate: true,

  themeConfig: {
    siteTitle: '🌟 bpradana.github.io',

    nav: [
      { text: 'Introduction', link: '/docs/introduction', activeMatch: '/docs/introduction' },
      { text: 'Resume', link: '/docs/resume', activeMatch: '/docs/resume'  },
      { text: 'Projects', link: '/guide' },
      { text: 'Blog', link: '/guide' },
    ],

    sidebar: {
      '/guide/': [],
      '/config/': []
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bpradana' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/bpradana' },
      { icon: 'twitter', link: 'https://twitter.com/Bintang_Pradana' }
    ],

    footer: {
      copyright: 'Copyright © 2022-present Bintang P E Putra',
    },
  }
}
