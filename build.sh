#!/bin/bash

# Переменные для замены
PRELEND=$1
DOMEN=$2

# Путь к проекту
PROJECT_PATH="/Users/user/Documents/Sites/Work/Vadim/Prelends/ManyOffers"

# Проверяем, переданы ли параметры
if [ -z "$PRELEND" ] || [ -z "$DOMEN" ]; then
  echo "Usage: ./build.sh <PRELEND> <DOMEN>"
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

# Создаем архив
zip -r "$PROJECT_PATH/updates/$ARCHIVE_NAME" "$PROJECT_PATH/dist"

# Сообщение о завершении
echo "Сборка завершена для PRELEND=$PRELEND с DOMEN=$DOMEN. Архив: $ARCHIVE_NAME."
