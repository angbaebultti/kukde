document.addEventListener("DOMContentLoaded", function () {

  const views = document.querySelectorAll(".product_view");

  function showView(target) {

    views.forEach(view => {
      view.classList.remove("active");
    });
    const targetView = document.getElementById(target + "_view");
    if (!targetView) return;

    targetView.classList.add("active");

    const buttons = targetView.querySelectorAll("[data-tab]");
    buttons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.tab === target) {
        btn.classList.add("active");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    history.pushState(null, "", `#${target}`);
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;

    const target = btn.dataset.tab;
    showView(target);
  });

  function checkHash() {
    const hash = window.location.hash.replace("#", "");

    if (hash === "solo" || hash === "together" || hash === "spicy") {
      showView(hash);
    } else {
      document.getElementById("default_view").classList.add("active");
    }
  }

  window.addEventListener("popstate", checkHash);
  checkHash();


});


