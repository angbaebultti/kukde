// dom 시작

document.addEventListener('DOMContentLoaded', () => {

  // 햄버거 쪽

  const btn = document.querySelector('.menu_toggle');
  const menu = document.querySelector('.all_menu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('is-open');
    menu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
  });


  // swiper

  const swiperEl = document.querySelector(".swiper");

  if (swiperEl) {
    const swiper = new Swiper(".swiper", {
      loop: true,
      speed: 600,
      slidesPerView: 1,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next_btn",
        prevEl: ".prev_btn",
      },
      on: {
        init: function () {
          updateTotal();
          updateCurrent(this);
        },
        slideChange: function () {
          updateCurrent(this);
          const progress = document.querySelector(".progress");
          if (progress) progress.style.width = "0%";
        },
        autoplayTimeLeft(s, time, progress) {
          const progressBar = document.querySelector(".progress");
          if (progressBar) {
            const percent = (1 - progress) * 100;
            progressBar.style.width = percent + "%";
          }
        }
      }
    });

    function updateCurrent(swiper) {
      const current = document.querySelector(".current");
      if (!current) return;
      let index = swiper.realIndex + 1;
      current.textContent = index < 10 ? "0" + index : index;
    }

    function updateTotal() {
      const total = document.querySelector(".total");
      if (!total) return;
      const slides = document.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)");
      let length = slides.length;
      total.textContent = length < 10 ? "0" + length : length;
    }
  }

  // quickbar

  const quickbar = document.querySelector('.quickbar');
  const toggleBtn = document.querySelector('.quick_toggle');
  const topBtn = document.querySelector('.quick_top');

  if (quickbar && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const open = quickbar.classList.toggle('is_open');
      toggleBtn.textContent = open ? 'x' : '+';
    });
  }

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  //map

  const regionData = {
    "서울특별시": {
      "강남구": [{
        name: "국대떡볶이 선릉역점",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50655.34290375344!2d126.94227804863282!3d37.48529549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4055a7ae5bb%3A0xf6a8b3cf5c877347!2z6rWt64yA65ah67O27J20IOyEoOumieyXreygkA!5e0!3m2!1sko!2skr!4v1771469460909!5m2!1sko!2skr"
      }],
      "서초구": [{
        name: "국대떡볶이 서초남부점",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50655.34290375344!2d126.94227804863282!3d37.48529549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1157d0c6325%3A0x7c8d960d6f89f123!2z6rWt64yA65ah67O27J20IOyEnOy0iOuCqOu2gOygkA!5e0!3m2!1sko!2skr!4v1771469434485!5m2!1sko!2skr"
      }]
    }
  };

  const sidoList = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시",
    "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
    "경기도", "강원특별자치도", "충청북도", "충청남도",
    "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
  ];

  const seoulGugun = [
    "강남구", "강동구", "강북구", "강서구", "관악구",
    "광진구", "구로구", "금천구", "노원구", "도봉구",
    "동대문구", "동작구", "마포구", "서대문구", "서초구",
    "성동구", "성북구", "송파구", "양천구", "영등포구",
    "용산구", "은평구", "종로구", "중구", "중랑구"
  ];

  const sidoSelect = document.getElementById("sido");
  const gugunSelect = document.getElementById("gugun");
  const storeSelect = document.getElementById("store");
  const mapFrame = document.getElementById("mapFrame");

  if (sidoSelect) {
    sidoList.forEach(sido => {
      const option = document.createElement("option");
      option.value = sido;
      option.textContent = sido;
      sidoSelect.appendChild(option);
    });

    sidoSelect.addEventListener("change", function () {
      const selectedSido = this.value;

      gugunSelect.innerHTML = '<option value="" disabled selected hidden>구/군 선택</option>';
      storeSelect.innerHTML = '<option value="" disabled selected hidden>매장명으로 검색하기</option>';

      mapFrame.src = "https://www.google.com/maps?q=" + selectedSido + "&output=embed";

      if (selectedSido === "서울특별시") {
        seoulGugun.forEach(gugun => {
          const option = document.createElement("option");
          option.value = gugun;
          option.textContent = gugun;
          gugunSelect.appendChild(option);
        });
      }
    });
  }

  gugunSelect?.addEventListener("change", function () {
    const selectedSido = sidoSelect.value;
    const selectedGugun = this.value;

    storeSelect.innerHTML = '<option value="" disabled selected hidden>매장명으로 검색하기</option>';
    mapFrame.src = "https://www.google.com/maps?q=" + selectedGugun + "&output=embed";

    if (regionData[selectedSido]?.[selectedGugun]) {
      regionData[selectedSido][selectedGugun].forEach(store => {
        const option = document.createElement("option");
        option.value = store.map;
        option.textContent = store.name;
        storeSelect.appendChild(option);
      });
    }
  });

  storeSelect?.addEventListener("change", function () {
    mapFrame.src = this.value;
  });

  // gsap 시작

  if (window.gsap && window.ScrollTrigger) {

    gsap.registerPlugin(ScrollTrigger);

    // menu

    const menuList = document.querySelector(".menu_box ul");
    if (menuList) {
      const items = menuList.querySelectorAll(".reveal_item");
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: menuList,
          start: "top 85%",
          once: true
        }
      });
    }

    // review 영역

    const reviewList = document.querySelector(".card_box ul");
    if (reviewList) {
      const cards = reviewList.querySelectorAll(".reveal_item");
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: reviewList,
          start: "top 85%",
          once: true
        }
      });
    }

    // business_con

    gsap.to(".business_con .inner", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".business_con",
        start: "top 80%",
        once: true
      }
    });

  }

  gsap.to(".scroll_progress", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

});

// dom 끝