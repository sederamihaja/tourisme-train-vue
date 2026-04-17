import { createApp } from "vue";
import type { Plugin } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import App from "./App.vue";
import "./style.css";
import router from "./router";

import "./css/sncf.scss";

const queryClient = new QueryClient();

createApp(App)
  .use(router)
  .use(VueQueryPlugin, {
    queryClient,
  })
  .use(PrimeVue as unknown as Plugin, {
    theme: {
      preset: Aura,
    },
  })
  .mount("#app");
