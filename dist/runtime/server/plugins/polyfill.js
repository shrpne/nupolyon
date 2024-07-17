import { joinURL, cleanDoubleSlashes } from "ufo";
import { useRuntimeConfig } from "#imports";
export default (function(nitroApp) {
  const config = useRuntimeConfig();
  const { src, isSelfHost } = config.public.nupolyon;
  const host = !isSelfHost ? src : cleanDoubleSlashes(joinURL(config.app.baseURL, src));
  if (host) {
    const preload = `<link rel="preload" href="${host}" crossorigin="anonymous" as="script" data-testid="nupolyon-preload" />`;
    const polyfill = `<script src="${host}" crossorigin="anonymous" data-testid="nupolyon-script"><\/script>`;
    nitroApp.hooks.hook("render:html", (html) => {
      html.head.unshift(preload, polyfill);
    });
  }
});
