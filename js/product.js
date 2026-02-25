document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  const views = document.querySelectorAll(".product_view");

  function initAnimations(scope) {

    ScrollTrigger.getAll().forEach(t => t.kill());

    gsap.set(scope.querySelectorAll("li"), { clearProps: "all" });

    const lists = scope.querySelectorAll(".menu_all ul, .set_menu_con ul, .other_menu_con ul");

    lists.forEach((ul) => {

      gsap.from(ul.querySelectorAll("li"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ul,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

    });

    ScrollTrigger.refresh();
  }


  //클릭 시 active
  function showViewById(viewId) {

    views.forEach(view => {
      view.classList.remove("active");
    });

    const targetView = document.getElementById(viewId);
    if (!targetView) return;

    targetView.classList.add("active");

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    initAnimations(targetView);
  }

  document.addEventListener("click", function (e) {

    const tabBtn = e.target.closest("[data-tab]");
    if (tabBtn) {
      const tab = tabBtn.dataset.tab;
      showViewById(tab + "_view");
      history.pushState(null, "", `#${tab}`);
      return;
    }

    const setItem = e.target.closest(".set_item");
    if (setItem) {
      const viewId = setItem.dataset.view;
      showViewById(viewId);
      history.pushState(null, "", `#${viewId.replace("_view","")}`);
    }

  });


  // 해시

  function checkHash() {
    const hash = window.location.hash.replace("#", "");

    if (hash) {
      showViewById(hash + "_view");
    } else {
      showViewById("default_view");
    }
  }

  window.addEventListener("popstate", checkHash);
  checkHash();

});