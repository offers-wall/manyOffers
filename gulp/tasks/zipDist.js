import zip from "gulp-zip";

export const zipDist = () => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
  const archiveName = `prelend_${app.prelend}_${timestamp}.zip`;

  if (!app.prelend) {
    console.error("Ошибка: app.prelend не определен!");
    return;
  }

  console.log(`Создание архива с именем: ${archiveName}`);

  return app.gulp
    .src("dist/**/*")
    .pipe(zip(archiveName)) 
    .pipe(app.gulp.dest("updates"))
    .on("end", () => {
      console.log(`Архив ${archiveName} успешно создан и сохранен в папку updates`);
    })
    .on("error", (err) => {
      console.error("Ошибка при создании архива:", err);
    });
};
