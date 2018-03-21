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
  modules: ['@nuxtjs/proxy'],
  proxy: {
    '/json': 'http://localhost:16325/',
    '/auth': 'http://localhost:16325/',
    '/users/*/avatar': 'http://localhost:16325/',
    '/prerender': 'http://localhost:7000/'
  },
  css: ['~/assets/css/gfm.css','~/assets/css/app.css'],
  /*
  ** Headers of the page
  */
  head: {
    title: 'TechStacks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TechStacks lets you Discover the Hottest Technology Stacks of the most popular Startups and Apps using your favorite languages and technologies!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { src: '/prerender.js', body: true }
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
