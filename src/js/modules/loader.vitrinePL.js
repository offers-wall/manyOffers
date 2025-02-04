import { git } from "./data.html";

export default function Loader() {
  if (location.hostname === "localhost" || location.hostname === git) {
    return;
  } else {
    const style = document.createElement("style");
    style.innerHTML = `
            #preloader {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgb(0, 0, 0);
                background: linear-gradient(180deg, rgba(0, 0, 0, 1) 21%, rgba(6, 20, 40, 1) 61%);
                z-index: 9999999;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
        
            #camera {
                width: 300px;
                height: 300px;
                position: absolute;
                left: 50%;
                top: 50%;
                background-image: url("./images/vitrinePL/preload2.gif");
                background-repeat: no-repeat;
                background-position: center;
                transform: translate(-50%, -50%);
                background-size: contain;
            }
        
            @media (max-width: 768px) {
                #camera {
                    width: 200px;
                    height: 200px;
                }
            }
          `;
    document.head.appendChild(style);

    window.addEventListener("load", function () {
      document.querySelector("body").classList.add("_lock");

      setTimeout(function () {
        document.querySelector("body").classList.remove("_lock");
        const preloader = document.getElementById("preloader");

        if (preloader) {
          preloader.style.transition = "opacity 0.5s";
          preloader.style.opacity = "0";
        }

        document.body.style.overflow = "visible";
      }, 1550);
    });
  }
}
