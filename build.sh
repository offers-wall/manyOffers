#!/bin/bash

# Переменные для замены
PRELEND=$1
DOMEN=$2
TASK_ID=$3  # Получаем TASK_ID через параметр командной строки
SEND_TO_ASANA=$4  # Новый параметр для отправки в Asana (опционально)

# Путь к проекту
PROJECT_PATH="/Users/user/Documents/Sites/Work/Vadim/Prelends/ManyOffers"

# Проверяем, переданы ли параметры
if [ -z "$PRELEND" ] || [ -z "$DOMEN" ] || [ -z "$TASK_ID" ]; then
  echo "Usage: ./build.sh <PRELEND> <DOMEN> <TASK_ID> [SEND_TO_ASANA]"
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
ARCHIVE_NAME="${PRELEND}_${DOMEN//[:\/.]/_}.zip"

# Убираем лишние символы "__" в домене
ARCHIVE_NAME="${ARCHIVE_NAME//__/_}"

# Проверка папки dist
DIST_PATH="$PROJECT_PATH/dist"
if [ ! -d "$DIST_PATH" ]; then
  echo "Ошибка: Папка dist не найдена!"
  exit 1
fi

# Переходим в папку dist, чтобы архивировать содержимое без полного пути
cd "$DIST_PATH" && tar -cvf "$PROJECT_PATH/updates/$ARCHIVE_NAME" ./*

# Создаем архив только с содержимым папки dist без пути к родительским директориям
echo "Создаю архив: $PROJECT_PATH/updates/$ARCHIVE_NAME"
zip -r "$PROJECT_PATH/updates/$ARCHIVE_NAME" ./*

# Проверка существования архива перед отправкой
if [ ! -f "$PROJECT_PATH/updates/$ARCHIVE_NAME" ]; then
  echo "Ошибка: Архив не найден!"
  exit 1
fi

# Сообщение о завершении
echo "Сборка завершена для PRELEND=$PRELEND с DOMEN=$DOMEN. Архив: $ARCHIVE_NAME."

# Если параметр SEND_TO_ASANA передан и равен "true", отправляем файл в Asana
if [ "$SEND_TO_ASANA" == "true" ]; then
  # API ключ для Asana
  ASANA_API_KEY="2/1207383441291604/1209227316720762:740806b4e51448663b2945b0267b489f"  # Ваш новый API ключ

  # Отправка файла в Asana
  echo "Отправка архива в Asana..."
  curl -X POST "https://api.asana.com/api/1.0/tasks/$TASK_ID/attachments" \
    -H "Authorization: Bearer $ASANA_API_KEY" \
    -F "file=@$PROJECT_PATH/updates/$ARCHIVE_NAME;type=application/zip"

  echo "Архив $ARCHIVE_NAME успешно прикреплен к задаче $TASK_ID"
else
  echo "Отправка архива в Asana пропущена."
fi
