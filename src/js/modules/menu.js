export function menu() {
  const wrapMenu = document.querySelector(".wrap-menu");

  const openButton = `<button class="open">=</button>`;
  const closeButton = `<button class="close">X</button>`;
  const menuHTML = `
    <div id="menu" class="menu">
      ${closeButton}
      <ul class="menu__list"></ul>
    </div>
  `;

  const items = [
    { id: 1, tag: "win1" },
    { id: 2, tag: "mostbet" },
    { id: 3, tag: "pinup" },
    { id: 4, tag: "aviator3" },
  ];

  wrapMenu.innerHTML = openButton + menuHTML;

  const menu = document.querySelector(".menu");
  const open = document.querySelector(".open");
  const close = document.querySelector(".close");

  open.addEventListener("click", () => {
    menu.classList.toggle("_open");
  });

  close.addEventListener("click", () => {
    menu.classList.remove("_open");
  });

  const menuList = document.querySelector(".menu__list");

  items.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.innerHTML = `<button data-layout=${item.tag} class="menu__link">${item.tag}</button>`;
    menuList.appendChild(menuItem);
  });

  const links = document.querySelectorAll(".menu__link");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      links.forEach((link) => link.classList.remove("_active"));

      event.target.classList.add("_active");

      menu.classList.remove("_open");
    });
  });
}
