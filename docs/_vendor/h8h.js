const CDN = "aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2hhY2tpbnRvc2gtY2x1Yg==";
window.$docsify = {
  cdn: atob(CDN),
  org: atob("aGFja2ludG9zaC1jbHVi"),
  repo: atob("aHR0cHM6Ly9naXRodWIuY29tL2hhY2tpbnRvc2gtY2x1Yg=="),
  name: "<strong>Hackintosh OpenCore EFI</strong>",
  alias: {
    "/(.*)/_navbar.md": "/_navbar.md",
    "/(.*)/_sidebar.md": "/_sidebar.md",
    "/r/(.*)": atob(CDN) + "/$1/README.md",
  },
  routerMode: "history",
  themeColor: "#F36322",
  onlyCover: false,
  coverpage: true,
  auto2top: true,
  loadSidebar: true,
  loadNavbar: true,
  nativeEmoji: false,
  notFoundPage: false,
  // baiduTongjiID
  baiduTongjiID: "a693e3c9fd4518f70373708ae51ceb65",
  // giscus
  giscus: {
    repo: atob("aGFja2ludG9zaC1jbHViL2VmaWh1Yi5jb21tZW50"),
    repoId: "R_kgDOLu2oNQ",
    category: "Comment",
    categoryId: "DIC_kwDOLu2oNc4CeuI7",
    mapping: "og:title",
    reactionsEnabled: "1",
    strict: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "transparent_dark",
    lang: "en",
    loading: "lazy",
  },
};
// plugins
(function (w, d) {
  // disable index.html
  if (new URL(w.location).pathname === atob("L2luZGV4Lmh0bWw=")) {
    w.location.href = "/";
    return;
  }

  var repoID = function (vm) {
    return vm.route.path.replace("/r/", "");
  };
  var repoPath = function (vm) {
    return vm.config.org + "/" + repoID(vm);
  };
  var allowRoute = function (vm) {
    return vm.route.path.startsWith("/r");
  };
  var repoURL = function (vm) {
    return vm.config.repo + vm.route.path.replace("/r", "");
  };
  var cdnURL = function (vm) {
    return vm.config.cdn + vm.route.path.replace("/r", "") + "/";
  };
  var backlink = function (vm) {
    return new URL(w.location).origin + vm.route.path;
  };
  var shields = function (item, label, logo) {
    label = label ? "&label=" + label : "";
    logo = logo ? "&logo=" + logo : "";
    return `${atob(
      "aHR0cHM6Ly9pbWcuc2hpZWxkcy5pby8="
    )}${item}?cacheSeconds=3600&style=flat-square${label}${logo}`;
  };

  var contentPlugin = function (hook, vm) {
    hook.beforeEach(function (markdown) {
      // console.info("hook.beforeEach");
      if (!allowRoute(vm)) {
        return markdown;
      }

      const _cdnURL = cdnURL(vm);
      // replace markdown img src attributes
      markdown = markdown.replace(/!\[.*?\]\((?!http)(.*?)\)/g, (match, p1) => {
        return `![${match
          .match(/\!\[.*?\]/)[0]
          .slice(2, -1)}](${_cdnURL}${p1})`;
      });

      // replace html img src attributes
      markdown = markdown.replace(
        /<img\s+([^>]*?)src=["'](?!http)([^"']+?)["']([^>]*)>/gi,
        (match, beforeSrc, src, afterSrc) => {
          return `<img ${beforeSrc}src="${_cdnURL}${src}"${afterSrc}>`;
        }
      );

      // remove README
      markdown = markdown.replace(/(#+)\s*\[.*?\]\(README.*?\.md\)\s*$/gm, "");

      return markdown;
    });

    hook.doneEach(function () {
      // console.info("hook.doneEach");
      if (!allowRoute(vm)) {
        return;
      }

      const _repoURL = repoURL(vm);
      const _repoPath = repoPath(vm);
      const _github = shields("badge/Github-gray", "", "github");
      const _release = shields(
        `github/v/release/${_repoPath}`,
        "Latest EFI",
        "apple"
      );
      const _stars = shields(
        `github/stars/${_repoPath}`,
        "stars",
        "data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMzE2LjkgMThDMzExLjYgNyAzMDAuNCAwIDI4OC4xIDBzLTIzLjQgNy0yOC44IDE4TDE5NSAxNTAuMyA1MS40IDE3MS41Yy0xMiAxLjgtMjIgMTAuMi0yNS43IDIxLjdzLS43IDI0LjIgNy45IDMyLjdMMTM3LjggMzI5IDExMy4yIDQ3NC43Yy0yIDEyIDMgMjQuMiAxMi45IDMxLjNzMjMgOCAzMy44IDIuM2wxMjguMy02OC41IDEyOC4zIDY4LjVjMTAuOCA1LjcgMjMuOSA0LjkgMzMuOC0yLjNzMTQuOS0xOS4zIDEyLjktMzEuM0w0MzguNSAzMjkgNTQyLjcgMjI1LjljOC42LTguNSAxMS43LTIxLjIgNy45LTMyLjdzLTEzLjctMTkuOS0yNS43LTIxLjdMMzgxLjIgMTUwLjMgMzE2LjkgMTh6Ii8+PC9zdmc+"
      );
      const _downloads = shields(
        `github/downloads/${_repoPath}/total`,
        "downloads",
        "data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjg4IDMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMybDAgMjQyLjctNzMuNC03My40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM2wxMjggMTI4YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDEyOC0xMjhjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMjg4IDI3NC43IDI4OCAzMnpNNjQgMzUyYy0zNS4zIDAtNjQgMjguNy02NCA2NGwwIDMyYzAgMzUuMyAyOC43IDY0IDY0IDY0bDM4NCAwYzM1LjMgMCA2NC0yOC43IDY0LTY0bDAtMzJjMC0zNS4zLTI4LjctNjQtNjQtNjRsLTEwMS41IDAtNDUuMyA0NS4zYy0yNSAyNS02NS41IDI1LTkwLjUgMEwxNjUuNSAzNTIgNjQgMzUyem0zNjggNTZhMjQgMjQgMCAxIDEgMCA0OCAyNCAyNCAwIDEgMSAwLTQ4eiIvPjwvc3ZnPg=="
      );
      var main = d.querySelector("#main");
      var div = d.createElement("div");
      div.innerHTML =
        `<a href="${_repoURL}" title="${_repoPath}" target="_blank"><img src="${_github}"></a> ` +
        `<a href="${_repoURL}/releases" title="Latest EFI Release" target="_blank"><img src="${_release}"></a> ` +
        `<a href="${_repoURL}/releases" title="downloads" target="_blank"><img src="${_downloads}"></a> ` +
        `<a href="${_repoURL}" title="stars" target="_blank"><img src="${_stars}"></a> `;
      main.insertBefore(div, main.childNodes[1]);
    });
  };

  var giscusPlugin = function (hook, vm) {
    const meta = {
      ogtitle: { property: "og:title" },
      backlink: { name: "giscus:backlink" },
    };

    hook.mounted(function () {
      // console.info("hook.mounted");
      var head = d.getElementsByTagName("head")[0];
      for (const [id, attr] of Object.entries(meta)) {
        var el = d.createElement("meta");
        el.id = id;
        for (const [k, v] of Object.entries(attr)) {
          el.setAttribute(k, v);
        }
        head.appendChild(el);
      }
    });

    hook.afterEach(function (html) {
      // console.info("hook.afterEach");
      if (!allowRoute(vm)) {
        return html;
      }

      if (d.querySelector("#ogtitle")) {
        d.querySelector("#ogtitle").setAttribute(
          "content",
          repoID(vm).toLowerCase()
        );
      }
      if (d.querySelector("#backlink")) {
        d.querySelector("#backlink").setAttribute("content", backlink(vm));
      }

      if (d.querySelector("#giscus")) {
        d.querySelector("#giscus").remove();
      }
      var giscus = d.createElement("script");
      giscus.id = "giscus";
      giscus.src = "https://giscus.app/client.js";
      giscus.crossorigin = "anonymous";
      giscus.async = true;
      for (const [k, v] of Object.entries(vm.config.giscus)) {
        giscus.dataset[k] = v;
      }
      var s = d.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(giscus, s);

      return html + "<div class='giscus'></div>";
    });
  };

  var baiduTongjiPlugin = function (hook, vm) {
    hook.mounted(function () {
      // console.info("hook.mounted");
      if (!vm.config.baiduTongjiID) {
        return;
      }

      var hm = d.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?" + vm.config.baiduTongjiID;
      var s = d.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    });
  };

  // Add plugin to docsify's plugin array
  $docsify = $docsify || {};
  $docsify.plugins = [].concat(
    contentPlugin,
    giscusPlugin,
    baiduTongjiPlugin,
    $docsify.plugins || []
  );
})(window, document);
