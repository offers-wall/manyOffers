import { git, prelend } from "./general";
import { layouts } from "./general";

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
  } else {
    wrap.innerHTML = layouts[prelend].content;
    document.title = layouts[prelend].title;
    const link =
      document.querySelector('link[rel="icon"]') ||
      document.createElement("link");
    link.rel = "icon";
    link.href = layouts[prelend].favicon;
    document.head.appendChild(link);
  }
}
