// Function for Dynamic Scroll
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add(
      "bg-gradient-to-br",
      "from-yellow-100",
      "via-orange-100",
      "to-pink-200",
      "backdrop-blur-md",
      "shadow-md"
    );
  } else {
    header.classList.remove(
      "bg-gradient-to-br",
      "from-yellow-100",
      "via-orange-100",
      "to-pink-200",
      "backdrop-blur-md",
      "shadow-md"
    );
  }
});
