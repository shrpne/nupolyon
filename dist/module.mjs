import { defineNuxtModule, createResolver, addServerPlugin, addServerHandler, extendViteConfig } from '@nuxt/kit';
import { withQuery } from 'ufo';
import polyfillist from 'polyfillist';
import browserslistToEsbuild from 'browserslist-to-esbuild';

const module = defineNuxtModule({
  meta: {
    name: "nupolyon",
    configKey: "nupolyon"
  },
  // Default configuration options of the Nuxt module
  defaults: {
    host: "https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js"
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const features = await polyfillist(options.target);
    const isSelfHost = options.host === "selfhost";
    const src = options.host && !isSelfHost ? withQuery(options.host, { features: features.join(",") }) : "/_nupolyon/polyfill";
    nuxt.options.runtimeConfig.nupolyon = { features };
    nuxt.options.runtimeConfig.public.nupolyon = { src, isSelfHost };
    addServerPlugin(resolver.resolve("./runtime/server/plugins/polyfill"));
    if (isSelfHost) {
      addServerHandler({
        method: "get",
        route: "/_nupolyon/polyfill",
        handler: resolver.resolve("./runtime/selfhost")
      });
    }
    extendViteConfig((config) => {
      if (config.build)
        config.build.target = browserslistToEsbuild(options.target);
    });
  }
});

export { module as default };
