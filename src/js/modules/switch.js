export function Switch() {
  const buttons = document.querySelectorAll(".menu__link");
  const wrap = document.querySelector(".wrap");

  const layouts = {
    win1: `
        <div class="win1">
          <img class="win1__bg" />
          <div class="win1__body">
            <img class="win1__logo" src="./images/win1/win1-logo.svg" alt="logo" />
            <div class="win1__popup win1-popup">
              <div class="win1-popup__content">
                <h1 class="pinup-popup__title">
                Bonus <br />
                <span>1 000 AZN + 250FS</span>
              </h1>
                <div class="win1-popup__wrap">
                  <a class="win1-popup__link color" href="/prev/index.html">Claim Bonus</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    mostbet: `
           <div class="mostbet">
        <img class="mostbet__bg" />
        <div class="mostbet__body">
          <img class="mostbet__logo" src="./images/mostbet/mostbet-logo.svg" alt="" />
          <div class="mostbet__popup mostbet-popup">
            <div class="mostbet-popup__content">
              <h1 class="mostbet-popup__title">
                Bonus <br />
               <span>1 000 AZN + 250FS</span>
              </h1>
              <div class="mostbet-popup__wrap">
                <a class="mostbet-popup__link color" href="/prev/index.html">Claim Bonus</a>
              </div>
            </div>
          </div>
        </div>
      </div> 
      `,
    pinup: `
      <div class="pinup">
        <img class="pinup__bg" />
        <div class="pinup__body">
          <img class="pinup__logo" src="./images/pinup/pinup-logo.svg" alt="" />
          <div class="pinup__popup pinup-popup">
            <div class="pinup-popup__content">
              <h1 class="pinup-popup__title">
                Bonus <br />
               <span>1 000 AZN + 250FS</span>
              </h1>
              <div class="pinup-popup__wrap">
                <a class="pinup-popup__link color" href="/prev/index.html">Claim Bonus</a>
              </div>
            </div>
          </div>
        </div>
      </div> 
      `,
  };

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const layoutName = event.target.getAttribute("data-layout");
      const selectedLayout = layouts[layoutName];

      if (selectedLayout) {
        wrap.innerHTML = selectedLayout;
      }
    });
  });
}
