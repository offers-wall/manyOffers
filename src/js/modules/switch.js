import { git, layouts } from "./data.html";

export function Switch() {
  const buttons = document.querySelectorAll(".menu__link");
  const wrap = document.querySelector(".wrap");

  if (location.hostname === "localhost" || location.hostname === git) {
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const layoutName = event.target.getAttribute("data-layout");
        const selectedLayout = layouts[layoutName];
        if (selectedLayout) {
          wrap.innerHTML = selectedLayout.content;
          document.title = selectedLayout.title;
          const link =
            document.querySelector('link[rel="icon"]') ||
            document.createElement("link");
          link.rel = "icon";
          link.href = selectedLayout.favicon;
          document.head.appendChild(link);
        }
      });
    });
  }
}
