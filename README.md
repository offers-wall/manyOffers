# Start Template: Gulp + WebPack + Babel

Сборку делал по примеру автора [youtube](https://www.youtube.com/watch?v=jU88mLuLWlk) канала: [Фрилансер по жизни](https://www.youtube.com/c/FreelancerLifeStyle)

## Для работы используйте такие комманды

- Для установки всех зависимостей: `$ npm install`;
- Для запуска сборщика Gulp нужно использовать: `$ npm run dev`;
- Для сборки проекта в режиме `"production"`: `$ npm run build`;

## Что делает Gulp?

- сжимает HTML в режиме `production`;
- удаляет комментарии из HTML в режиме `production`;
- собирает SCSS файлы, добавляет вендорные префиксы;
- удаляет комментарии из SCSS файлов;
- в режиме `production` сжимает CSS и делает копию без сжатия;
- конвертирует шрифты в `.ttf`, и из `.ttf` в `woff/woff2`;
- создает файл для подключения шрифтов. Данный файл создается по такому пути: `src/scss/config/fonts.scss`, выглядит это так:

```scss
@font-face {
  font-family: Inter;
  font-display: swap;
  src: url('../fonts/Inter-Bold.woff2') format('woff2'), url('../fonts/Inter-Bold.woff')
      format('woff');
  font-weight: 700;
  font-style: normal;
}
```

### ВНИМАНИЕ!!!

> Если в папке `src/scss/config` - уже есть файл `fonts.scss` - тогда при добавлении новых шрифтов **НУЖНО УДАЛИТЬ** старый файл `fonts.scss`. Не переживай, при повторном запуске сборки Gulp все новые шрифты сконвертирует и создаст новый файл `fonts.scss`.

Дальше, что еще умеет сборка:

- сжимает изображения и конвертирует их дополнительно в формат `.webp` и подключает их если браузер поддерживает этот формат;
- копирует папку `/static` с содержимым в финальную сборку. То есть любые файлы можно поместить в эту папку и она будет добавлена в финальную сборку;
- отдельной коммандой `$ npm run svgSprive` cоздает "svg cпрайты";
- перед каждым запуском сборщика чистит папку с финальным проектом, чтобы не собирать муссор;
- отдельной коммандой `$ npm run zip` можно заархивировать финальную папку для заказчика **с именем проекта**;
- так же для разработи `gulp` запускает сервер с автоматической перезагрузкой окна в браузере при изменении файлов в проекте;
- отдельной коммандой `$ npm run deployFTP` финальный проект выгружается на хостинг. Опции для отправки проекта на нужный хостинг указываются в файле: `gulp/config/ftp.js`.

## Что делает WebPack?

- именно `webpack` в данной сборке занимается обработкой файлов c JavaScript;
- поддерживается модульное подключение скриптов `import/export`;
- при импорте нет необходимости писать расширение файла `.js`, так же если осуществляется импорт из файла `index.js` не обязательно это указывать:

```javascript
import * as flsFunctions from './modules' // './modules/index.js'
```

- `webpack` c помощью `babel` позволяет тебе писать код на любимом **ES6+**;
- в режиме `"production"` при финальной сборке файлы JS сжимаются, а лишние комментарии удаляются.

## Финал

Отдельной вишенкой является плагин `gh-pages` для деплоя папки `/dist` на отдельную ветку GitHub, чтобы красиво развернуть свой проект на GitHub Pages. Для этого в `package.json` укажи в поле **homepage** ссылку на свою страницу gh-pages:

```json
"homepage": "https://{UserName}.github.io/{NameRepo}",
```

По любым вопросам касающихся сборки пишите мне в [Telegram](https://t.me/StarkElessar).




Команда для запуска апдейта
 build.sh name_prelend domen taskID


Файл енв -
 PRELEND=
DOMEN=


Добавить переменную в окружение   nano ~/.zshrc  # Для Zsh
 export PATH=$PATH:/Users/user/Documents/Sites/


cntr X - save Y - ok

build.sh  win1  https://denchik.com  1209201545150618


#!/bin/bash

# Переменные для замены
PRELEND=$1
DOMEN=$2
TASK_ID=$3  # Получаем TASK_ID через параметр командной строки

# Путь к проекту
PROJECT_PATH="/Users/user/Documents/Sites/Work/Vadim/Prelends/ManyOffers"

# Проверяем, переданы ли параметры
if [ -z "$PRELEND" ] || [ -z "$DOMEN" ] || [ -z "$TASK_ID" ]; then
  echo "Usage: ./build.sh <PRELEND> <DOMEN> <TASK_ID>"
  exit 1
fi

# Обновляем .env
echo "PRELEND=$PRELEND" > "$PROJECT_PATH/.env"
echo "DOMEN=$DOMEN" >> "$PROJECT_PATH/.env"
echo ".env обновлен: PRELEND=$PRELEND, DOMEN=$DOMEN"

# Переходим в директорию проекта
cd "$PROJECT_PATH" || { echo "Не удалось перейти в директорию $PROJECT_PATH"; exit 1; }

# Выводим текущую директорию для диагностики
echo "Текущая директория: $(pwd)"

# Проверяем наличие gulpfile.js
if [ ! -f gulpfile.js ]; then
  echo "Не найден gulpfile.js в $PROJECT_PATH"
  exit 1
fi

# Запускаем сборку Gulp
npx gulp buildPrelend

# Формируем имя архива без лишних символов
ARCHIVE_NAME="${PRELEND}_${DOMEN//[^a-zA-Z0-9]/_}.zip"

# Проверка существования архива
ARCHIVE_PATH="$PROJECT_PATH/updates/$ARCHIVE_NAME"
if [ -f "$ARCHIVE_PATH" ]; then
  echo "Архив существует и будет удалён: $ARCHIVE_NAME"
  rm "$ARCHIVE_PATH"
fi

# Проверка прав на запись в директорию
if [ ! -w "$PROJECT_PATH/updates" ]; then
  echo "Нет прав на запись в папку updates."
  exit 1
fi

# Проверка папки dist
DIST_PATH="$PROJECT_PATH/dist"
if [ ! -d "$DIST_PATH" ]; then
  echo "Ошибка: Папка dist не найдена!"
  exit 1
fi

# Проверка, что папка dist не пуста
if [ ! "$(ls -A "$DIST_PATH")" ]; then
  echo "Ошибка: Папка dist пуста!"
  exit 1
fi

# Очистка папки images от лишних папок
IMAGES_PATH="$DIST_PATH/images"
if [ -d "$IMAGES_PATH" ]; then
  echo "Очистка папки images, оставляем только папку $PRELEND..."

  # Удаляем все папки в images, кроме выбранной
  for folder in "$IMAGES_PATH"/*; do
    if [ -d "$folder" ] && [[ "$(basename "$folder")" != "$PRELEND" ]]; then
      echo "Удаляем папку: $folder"
      rm -rf "$folder"
    fi
  done
fi

# Переходим в папку dist, чтобы архивировать содержимое без полного пути
cd "$DIST_PATH" && zip -r "$PROJECT_PATH/updates/$ARCHIVE_NAME" ./*

# Проверка существования архива перед отправкой
if [ ! -f "$ARCHIVE_PATH" ]; then
  echo "Ошибка: Архив не найден!"
  exit 1
fi

# Сообщение о завершении
echo "Сборка завершена для PRELEND=$PRELEND с DOMEN=$DOMEN. Архив: $ARCHIVE_NAME."


# Отправка архива в Asana
ASANA_API_KEY=""  # Ваш новый API ключ

# Отправка файла в Asana
echo "Отправка архива в Asana..."
curl -X POST "https://api.asana.com/api/1.0/tasks/$TASK_ID/attachments" \
  -H "Authorization: Bearer $ASANA_API_KEY" \
  -F "file=@$PROJECT_PATH/updates/$ARCHIVE_NAME;type=application/zip"

echo "Архив $ARCHIVE_NAME успешно прикреплен к задаче $TASK_ID"

