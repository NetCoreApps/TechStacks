(async () => {
  const host = location.host;
  const prerenderUrl = host == "techstacks.io" || host == "www.techstacks.io" ?
      `https://${host}/prerender` 
    : host.indexOf("localhost") >= 0 ?
      "http://localhost:7000"
    : "/prerender";
  const log = console.log && true;

  const getPreRender = async path =>
    (await fetch(`${prerenderUrl}${path || "/"}`)).text();

  //pages can add <i class="__hasData"></i> to indicate data rendered correctly
  const hasData = () => {
    const ret = document.getElementsByClassName("__hasData")[0] != null;
    if (ret && log) console.log("hasData, skipping prerendering...");
    return ret;
  };

  const path = location.pathname + location.search;
  if (hasData()) return;

  const injectPrenderedContent = async() => {
    let html = null;
    try {
      html = await getPreRender(path);
      if (!html || html.trim().length == 0) {
        if (log) console.log("empty html, skipping prerendering...");
        return;
      }
      if (hasData()) return;

      if (log) console.log(`injecting prerendered content: ${html.length} chars`);
      document.getElementById("__nuxt").innerHTML = html;
    } catch (e) {
      if (log) console.log("prerender error", e);
    }
  };

  // G isn't good enough to render Nuxt apps yet, loading pre-rendered version until then
  const isBot = /bot|crawl|spider/i.test(navigator.userAgent);
  if (isBot) {
    injectPrenderedContent();
  } else {
    // setTimeout(() => {
    //   if (hasData()) return;
    //   injectPrenderedContent();
    // }, 2000);
  }
})();
