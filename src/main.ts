import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./styles/index.css";

import { createApolloClient } from "@nhost/apollo";
import { NhostClient } from "@nhost/vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { inspect } from "@xstate/inspect";

import App from "./App.vue";
import { routes } from "./routes";

const devTools = import.meta.env.VITE_DEBUG === "true";
if (devTools) {
  inspect({
    url: "https://stately.ai/viz?inspect",
    iframe: false,
  });
}

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN || "localhost:1337",
  region: import.meta.env.VITE_NHOST_REGION,
  devTools,
});

const apolloClient = createApolloClient({ nhost });

// ? Make it part of @nhost/apollo?
nhost.auth.onAuthStateChanged((d) => {
  if (d === "SIGNED_OUT") {
    console.log("clear store");
    apolloClient.clearStore();
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authenticated = await nhost.auth.isAuthenticatedAsync();
  if (!authenticated && to.meta.auth) {
    return "/signin";
  }
  return true;
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .use(nhost)
  .mount("#app");
