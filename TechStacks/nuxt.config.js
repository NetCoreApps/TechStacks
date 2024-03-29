module.exports = {
  mode: 'spa',
  srcDir: 'src',
  generate: {
    dir: 'wwwroot',
    routes: []
  },
  plugins: [
    '~/plugins/vuetify.js',
    { src: '~plugins/ga.js', ssr: false },
    { src: '~/plugins/nuxt-client-init.js', ssr: false }
  ],
  router: {
    middleware: 'routes'
  },
  modules: ['@nuxtjs/proxy'],
  proxy: {
    '/api': 'https://localhost:5001/',
    '/auth': 'https://localhost:5001/',
    '/users/*/avatar': 'https://localhost:5001/',
  },
  css: ['~/assets/css/typography.css','~/assets/css/gfm.css','~/assets/css/styles.css'],
  /*
  ** Headers of the page
  */
  head: {
    title: 'techstacks.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TechStacks lets you Discover the Hottest Technology Stacks of the most popular Startups and Apps using your favorite languages and technologies!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
