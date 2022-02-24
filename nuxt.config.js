export default {
  ssr: true,
  server: {
    host: '0' // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    title: 'Gunn.One',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg', href: '/icon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Quicksand:wght@300;351;400;500;600;700&display=swap'
      }
    ],
    script: [
      {
        innerHTML:"const isDark = localStorage['g1.darkMode'] === 'true' || (!('g1.darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark', isDark)",
        type:'text/javascript'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src:'~/plugins/luxon.js', //mode:'client'
    },
    {
      src:'~/plugins/barcode.js'
    },
    '~/plugins/elim.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxtjs-multi-auth',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/firebase',
    '@nuxtjs/gtm',
    'nuxt-socket-io',
  ],
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'wss://api.gunnelimination.com'
    }]
  },
  gtm: {
    id: 'GTM-W2JN9ZK'
  },
  firebase: {
    // options
    config: {
      apiKey: "AIzaSyDjLQAzre_M7puZsitnnXhu7uH6M-JIerc",
      authDomain: "homeworkcentral.firebaseapp.com",
      databaseURL: "https://homeworkcentral.firebaseio.com",
      projectId: "homeworkcentral",
      storageBucket: "homeworkcentral.appspot.com",
      messagingSenderId: "709390643857",
      appId: "1:709390643857:web:7ee7ad222cf5f2ba9f4530",
      measurementId: "G-WYFJH182BL"
    },
    services: {
      database: true,
    }
  },
  auth: {

      redirect: {
        login: '/login',
        logout: '/login',
        home: '/app',
      },
      strategies: {
          schoology: {
            scheme: 'local',
            token: {
              property: 'jwt',
              // required: true,
              type: 'JWT',
              maxAge: 60*60*24
            },
            user: {
              property: false,
              // autoFetch: false
            },
            endpoints: {
              login: { baseURL:'/api', url: '/auth/login', method: 'post' },
              logout: { url: '/auth/logout', method: 'post' },
              user: { url: '/users/me', baseURL:'/api', method: 'get' }
            }
          },
          'app/elimination':{
            scheme: 'local',
            token: {
              property: false,
              // required: true,
              type: 'Bearer',
            },
            user: {
              property: false,
              // autoFetch: true
            },
            endpoints: {
              login: { baseURL:'https://api.gunnelimination.com', url: '/login', method: 'post' },
              logout: { baseURL:'https://api.gunnelimination.com', url: '/logout', method: 'post' },
              user: { baseURL:'https://api.gunnelimination.com', url: '/users/@me', method: 'get' }
            }
          }
    }

  },
  router: {
    middleware: ['auth-user']
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/api',
    port: 3000
  },

  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/auth.js' }
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'Gunn.One',
      short_name: 'G•1',
      start_url: '/app?standalone=true',
      background_color: '#4E9DDE'
    },
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'black',
      name:'Gunn.One',
      theme_color:'#4E9DDE',
      description: 'Everything at Gunn, all in One.',
      ogImage: true,
      nativeUI: true,
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
