// dom 시작

document.addEventListener('DOMContentLoaded', () => {

// gsap

  gsap.registerPlugin(ScrollTrigger);


  gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});


});



// dom 끝