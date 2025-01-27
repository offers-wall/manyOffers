import { exec } from "child_process";
import { promisify } from "util";
import { layouts } from "../../src/js/modules/data.html.js";
import { promises as fsPromises } from "fs";

const execPromise = promisify(exec);

// Функция для выполнения команды npm run build
export const runBuild = async (done) => {
  try {
    console.log("Запуск сборки проекта...");
    const { stdout, stderr } = await execPromise("npm run build");
    if (stderr) {
      console.error(`Ошибка при сборке: ${stderr}`);
      done(new Error(`Ошибка при сборке: ${stderr}`));
      return;
    }
    console.log(stdout); // Выводим результат сборки
    done(); // Завершаем задачу
  } catch (err) {
    console.error("Ошибка при выполнении команды сборки:", err);
    done(err);
  }
};

export const prelend = async (done) => {
  const selectedLayout = layouts[app.prelend];
  if (!selectedLayout) {
    console.error(`Prelend "${app.prelend}" не найден!`);
    done(new Error(`Prelend "${app.prelend}" не найден!`));
    return;
  }

  let content = selectedLayout.content.replace(/\${domen}/g, app.domen);

  const mainLayoutContent = `
    <!DOCTYPE html>
    <html lang=${selectedLayout.language}>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link type="image/png" sizes="16x16" rel="icon" href=${selectedLayout.favicon}>
      <link rel="stylesheet" href="css/style.min.css" />
      <title>${selectedLayout.title}</title>
    </head>
    <body>
      <div class="wrapper">
        <main class="page">
          <div class="wrap">
            ${content} 
          </div>
        </main>
      </div>
      <script src="js/app.min.js" defer="defer"></script>
    </body>
    </html>
  `;

  try {
    await fsPromises.mkdir("dist", { recursive: true });
    await fsPromises.writeFile("dist/index.html", mainLayoutContent);

    console.log(`Собран prelend: ${app.prelend}, с доменом: ${app.domen}`);
    done();
  } catch (error) {
    console.error("Ошибка при создании prelend:", error);
    done(error);
  }
};
