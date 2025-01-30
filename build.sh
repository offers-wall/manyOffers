
# Переменные для замены
PRELEND=$1
DOMEN=$2
TASK_ID=$3  # Получаем TASK_ID через параметр командной строки

# Путь к проекту
PROJECT_PATH="D:\Work\Vadim\manyOffers"

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
ASANA_API_KEY="2/1207383441291604/1209227316720762:2f889568e8ae32535f547b5a18912c78"  # Ваш новый API ключ

# Отправка файла в Asana
echo "Отправка архива в Asana..."
curl -X POST "https://api.asana.com/api/1.0/tasks/$TASK_ID/attachments" \
  -H "Authorization: Bearer $ASANA_API_KEY" \
  -F "file=@$PROJECT_PATH/updates/$ARCHIVE_NAME;type=application/zip"

echo "Архив $ARCHIVE_NAME успешно прикреплен к задаче $TASK_ID"