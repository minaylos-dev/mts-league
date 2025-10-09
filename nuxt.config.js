// import language from './config/language';

const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === 'development';
const isProd = nodeEnv === 'production';

const serverUrl = process.env.SERVER_URL || '/';
const clientUrl = process.env.CLIENT_URL || '/';

const host = process.env.NUXT_HOST || '0.0.0.0';
const port = process.env.NUXT_PORT || 3000;
const robots = JSON.parse(
  process.env.NUXT_ROBOTS?.replace(/'/g, '"') || JSON.stringify({ Disallow: ' / ' })
);

const sentryDsn = process.env.SENTRY_DSN || '';

// Polyfills: https://polyfill.io/v3/url-builder/
// const features = ['NodeList.prototype.forEach'].join('%2C');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Лига МТС. Лучшие из лучших\n',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=0',
      },
      {
        name: 'description',
        content: 'Выбирай номинацию, номинируй себя или коллегу, подавай проект и голосуй!',
      },
      { name: 'og:title', content: 'Лига МТС. Лучшие из лучших' },
      {
        name: 'og:description',
        content: 'Выбирай номинацию, номинируй себя или коллегу, подавай проект и голосуй!',
      },
      { name: 'og:image', content: '/sharing.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },

      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },

      { rel: 'manifest', href: '/manifest.json' },
      // Preload fonts
      // {
      //   rel: 'preload',
      //   as: 'font',
      //   crossorigin: 'crossorigin',
      //   type: 'font/woff2',
      //   href: '/fonts/some-font.woff2',
      // },
    ],
    // script: [
    //   { src: `https://polyfill.io/v3/polyfill.min.js?features=${features}` }, // Polyfills
    // ],
  },

  // https://nuxtjs.org/docs/2.x/features/loading
  loading: false,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
  server: { host, port },

  // Env variables: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env
  // env: {
  //   someKey: process.env.SOME_KEY,
  // },

  // Router: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
  router: {
    middleware: ['auth', 'redirects'],
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/device',
    '@/plugins/event-bus',
    '@/plugins/helpers',
    '@/plugins/global',
    '@/plugins/ui',
    '@/plugins/vee-validate',
    '@/plugins/typograf',
    { src: '@/plugins/body-lock', mode: 'client' },
    { src: '@/plugins/vue-simplebar', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org/
    '@nuxtjs/proxy', // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/device', // https://github.com/nuxt-community/device-module
    '@/modules/robots',
    'cookie-universal-nuxt',
    'cookie-universal-nuxt',
    // '@nuxtjs/gtm', // https://github.com/nuxt-community/gtm-module
    // 'nuxt-i18n', // https://i18n.nuxtjs.org/
    '@nuxtjs/sentry', // https://sentry.nuxtjs.org/
  ],

  sentry: {
    dsn: sentryDsn,
  },

  robots,

  axios: {
    baseURL: serverUrl, // server requests
    browserBaseURL: !isDev && clientUrl, // client requests
    proxy: isDev,
    headers: {
      accept: 'application/json',
    },
  },

  proxy: {
    '/api': {
      target: clientUrl,
    },
  },

  device: {
    refreshOnResize: true,
  },

  // gtm: {
  //   id: 'GTM-NF26BLG',
  // },

  // i18n: {
  //   locales: ['ru', 'en'],
  //   defaultLocale: 'ru',
  //   strategy: 'prefix',
  //   vueI18n: {
  //     fallbackLocale: 'en',
  //     messages: language,
  //   },
  // },
  serverMiddleware: [
    (req, res, next) => {
      if (/\/{2,}/.test(req.url)) {
        const url = req.url.replace(/\/{2,}/g, '/');
        res.writeHead(301, { Location: url });
        return res.end();
      }
      next();
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/eslint-module', { cache: false }], // https://go.nuxtjs.dev/eslint
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extractCSS: isProd,
    cssSourceMap: isDev,
    transpile: ['vee-validate/dist/rules'],
    loaders: {
      scss: {
        additionalData: `
        @import "./assets/scss/base/mixins.scss";
        @import "./assets/scss/base/variables.scss";
        @import "./assets/scss/base/breakpoint.scss";`,
      },
    },
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
      },
    },
    // transpile: [], // Transpile dependencies, example: 'swiper'
    babel: {
      presets({ isServer }, [preset, options]) {
        return [
          [
            preset,
            {
              ...options,
              targets: isServer ? { node: '10' } : { ie: '11' },
            },
          ],
        ];
      },
    },
    extend(config) {
      config.module.rules
        .filter((r) => r.test.toString().includes('svg'))
        .forEach((r) => {
          r.test = /\.(png|jpe?g|gif)$/;
        });

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-loader',
        exclude: /node_modules/,
      });
    },
  },
};
