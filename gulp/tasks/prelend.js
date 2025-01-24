import { zipDist } from "./zipDist.js";
import gulp from "gulp";
const { series } = gulp;
import { layouts } from "../../src/js/modules/data.html.js";
import fs from "fs";

export const prelend = (done) => {
  const selectedLayout = layouts[app.prelend];
  if (!selectedLayout) {
    console.error(`Prelend "${app.prelend}" не найден!`);
    done();
    return;
  }

  let content = selectedLayout.content.replace(/\${domen}/g, app.domen);

  if (selectedLayout.title) {
    content = content.replace(
      /<title>.*<\/title>/,
      `<title>${selectedLayout.title}</title>`
    );
  }

  if (selectedLayout.favicon) {
    content = content.replace(
      /<\/head>/,
      `<link rel="icon" type="image/png" href="${selectedLayout.favicon}" />\n</head>`
    );
  }

  // Добавляем подключение стилей для конкретного прелендинга
  content = content.replace(
    /<\/head>/,
    `<link rel="stylesheet" href="css/${app.prelend}.css" />\n</head>`
  );

  if (!fs.existsSync("dist")) fs.mkdirSync("dist");

  fs.writeFileSync("dist/index.html", content);

  console.log(`Собран prelend: ${app.prelend}, с доменом: ${app.domen}`);
  done();
};


// Экспортируем серию задач
export const buildPrelend = series(prelend, zipDist);
