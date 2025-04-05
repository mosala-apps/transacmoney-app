import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "TransacMoney";
const shortTitle = "TransacMoney";
const description = "TransacMoney";
const image = "https://vuetify3nuxt3starter.behonbaker.com/starter.png";
const url = "https://vuetify3nuxt3starter.behonbaker.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],
  // enable takeover mode
  ssr:false,
  typescript: { shim: false },
  build: { transpile: ["vuetify","vue-toastification","EasyDataTable"] },
  modules: [
    "@kevinmarrec/nuxt-pwa",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    // "@sidebase/nuxt-auth",
    "@nuxtjs/color-mode",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  // auth: {
  //   baseURL:'http://localhost:4500/api',
  //   globalAppMiddleware: true,
  //   provider: { console.log("je suis sur le middlware auth:")
  //     pages:{
  //       login:'auth/signin',
  //     },
  //     type: "local",
  //     token: {
  //       signInResponseTokenPointer: '/token',
  //       type: 'Bearer',
  //       headerName: 'Authorization',
  //       maxAgeInSeconds: 30 * 60
  //     },
  //     sessionDataType: { id: 'string | number' },
  //     endpoints: {
  //       signIn: { path: "/auth/login", method: "post" },
  //       signOut: { path: "/logout", method: "post" },
  //       signUp: { path: "/auth/register", method: "post" },
  //     },
  //   },
  // },
  app: {  
    head: {
      title: "TransacMoney",
      titleTemplate: "%s | TransacMoney",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },
  pwa: {
    meta: {
      name: shortTitle,
      author: "Behon Baker",
      theme_color: "#4f46e5",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#4f46e5",
      description: description,
    },
  },
});
