document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".menu_option button");
  const items = document.querySelectorAll(".set_menu_con .menu_item");

  buttons.forEach(button => {

    button.addEventListener("click", function () {

      const filter = this.dataset.filter;

      // 버튼 active 이동
      buttons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      // 추천 세트 필터링
      items.forEach(item => {
        const category = item.dataset.category;

        if (category.includes(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

    });

  });

});