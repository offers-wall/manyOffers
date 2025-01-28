function gclid() {
  const params = window.location.href;

  const urlWithoutBase = params.replace(/http[s]?:\/\/[^\/]+/, "");

  const formattedUrl = urlWithoutBase.replace(/\?([^?]*)\?/, "?$1&");

  const urlParams = formattedUrl.split("?")[1];

  window.addEventListener("load", function () {
    const links = document.querySelectorAll(".link");

    console.log(links);
    

    links.forEach((link) => {
      let url = new URL(link.href);

      if (urlParams) {
        const separator = url.search ? "&" : "?";
        url.search += `${separator}${urlParams}`;
      }

      link.href = url.toString();
    });
  });
}

export { gclid };
