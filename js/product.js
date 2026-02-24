document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  const views = document.querySelectorAll(".product_view");

  // ==========================
  // 애니메이션 초기화
  // ==========================
  function initAnimations(scope) {

    // 기존 트리거 제거 (중복 방지)
    ScrollTrigger.getAll().forEach(t => t.kill());

    // --------------------------
    // detail_view (.menu_all)
    // --------------------------
    const detailLists = scope.querySelectorAll(".menu_all ul");

    detailLists.forEach((ul) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ul,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(ul.querySelectorAll("li"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: {
          each: 0.15
        },
        ease: "power1.out"
      });
    });

    // --------------------------
    // default_view (.set_menu_con)
    // --------------------------
    const setLists = scope.querySelectorAll(".set_menu_con ul");

    setLists.forEach((ul) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ul,
          start: "top 85%"
        }
      });

      tl.from(ul.querySelectorAll("li"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: {
          each: 0.15
        },
        ease: "power1.out"
      });
    });

    // --------------------------
    // default_view (.other_menu_con)
    // --------------------------
    const otherLists = scope.querySelectorAll(".other_menu_con ul");

    otherLists.forEach((ul) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ul,
          start: "top 85%"
        }
      });

      tl.from(ul.querySelectorAll("li"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: {
          each: 0.15
        },
        ease: "power1.out"
      });
    });
  }

  // ==========================
  // View 전환
  // ==========================
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

    window.scrollTo({ top: 0 });

    // 애니메이션 실행
    initAnimations(targetView);
    ScrollTrigger.refresh();

    history.pushState(null, "", `#${target}`);
  }

  // ==========================
  // 버튼 클릭 처리
  // ==========================
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;

    const target = btn.dataset.tab;
    showView(target);
  });

  // ==========================
  // 첫 진입 처리
  // ==========================
  function checkHash() {

    const hash = window.location.hash.replace("#", "");

    if (hash === "solo" || hash === "together" || hash === "spicy") {
      showView(hash);
    } else {
      const defaultView = document.getElementById("default_view");
      defaultView.classList.add("active");
      initAnimations(defaultView);
    }
  }

  window.addEventListener("popstate", checkHash);
  checkHash();

});