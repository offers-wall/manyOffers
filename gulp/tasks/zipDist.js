import zip from "gulp-zip"; // Импорт gulp-zip

export const zipDist = () => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Уникальное имя архива
  return app.gulp
    .src("dist/**/*") // Берем содержимое папки dist
    .pipe(zip(`dist_${app.prelend}_${timestamp}.zip`)) // Имя архива
    .pipe(app.gulp.dest("updates")); // Сохраняем архив в папку updates
};
