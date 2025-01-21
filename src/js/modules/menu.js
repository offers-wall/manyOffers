export function menu() {
  const items = [
    { id: 1, tag: "win1" },
    { id: 2, tag: "mostbet" },
    { id: 3, tag: "pinup" },
  ];

  const menu = document.querySelector(".menu");
  const open = document.querySelector(".open");
  const close = document.querySelector(".close");

  open.addEventListener("click", () => {
    menu.classList.toggle("_open");
  });

  close.addEventListener("click", () => {
    menu.classList.remove("_open");
  });

  items.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.innerHTML = `<button data-layout=${item.tag} class="menu__link" >${item.tag}</button>`;
    menu.appendChild(menuItem);
  });

  const links = document.querySelectorAll(".menu__link");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      links.forEach((link) => link.classList.remove("_active"));

      event.target.classList.add("_active");
    });
  });
}
