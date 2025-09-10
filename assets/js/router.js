(function () {
  const routes = {};

  function add(path, handler) {
    routes[path] = handler;
  }

  function parseHash() {
    const hash = location.hash.replace(/^#/, '') || '/';
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    return { path, params };
  }

  function navigate(path) {
    if (location.hash !== `#${path}`) {
      location.hash = path;
    } else {
      // Re-dispatch
      onRouteChange();
    }
  }

  function onRouteChange() {
    const { path, params } = parseHash();
    const handler = routes[path] || routes['/404'];
    if (handler) handler({ params });
  }

  window.Router = { add, navigate, parseHash };
  window.addEventListener('hashchange', onRouteChange);
  window.addEventListener('DOMContentLoaded', onRouteChange);
})();
