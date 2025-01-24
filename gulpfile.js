import gulp from "gulp";
import { path } from "./gulp/config/path.js"; // Импорт путей
import { plugins } from "./gulp/config/plugins.js"; // Импорт общих плагинов
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip as zipTask } from "./gulp/tasks/zip.js";
import { runBuild } from "./gulp/tasks/prelend.js"; // Это выполняет npm run build
import { ftp } from "./gulp/tasks/ftp.js";
import { prelend } from "./gulp/tasks/prelend.js"; // Это формирует prelend верстку
import * as dotenv from "dotenv";

dotenv.config();

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  prelend: process.env.PRELEND, // Убедитесь, что PRELEND и DOMEN заданы в .env
  domen: process.env.DOMEN,
  path,
  gulp,
  plugins,
};

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.static, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// Задачи для разработки и сборки
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Задачи для деплоя
const deployZIP = gulp.series(reset, mainTasks, zipTask);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Выполнение сценария по умолчанию
gulp.task("default", dev);

// Сценарий для сборки с prelend
gulp.task("buildPrelend", gulp.series(build, prelend));

// Экспорт сценариев
export { dev, build, deployZIP, deployFTP, svgSprive };
