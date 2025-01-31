# Переменные из аргументов
param (
    [string]$PRELEND,
    [string]$DOMEN,
    [string]$TASK_ID
)

# Проверяем переданные параметры
if (-not $PRELEND -or -not $DOMEN -or -not $TASK_ID) {
    Write-Host "Usage: .\build.ps1 <PRELEND> <DOMEN> <TASK_ID>"
    exit 1
}

# Указываем путь к проекту
$PROJECT_PATH = "D:\Work\Vadim\manyOffers"

# Записываем в .env
Set-Content -Path "$PROJECT_PATH\.env" -Value "PRELEND=$PRELEND"
Add-Content -Path "$PROJECT_PATH\.env" -Value "DOMEN=$DOMEN"
Write-Host ".env обновлен: PRELEND=$PRELEND, DOMEN=$DOMEN"

# Переход в папку проекта
Set-Location -Path $PROJECT_PATH

# Проверяем, существует ли gulpfile.js
if (-Not (Test-Path "gulpfile.js")) {
    Write-Host "Не найден gulpfile.js в $PROJECT_PATH"
    exit 1
}

# Запускаем сборку Gulp
npx gulp buildPrelend

# Формируем имя архива
$ARCHIVE_NAME = "${PRELEND}_${($DOMEN -replace '[^a-zA-Z0-9]', '_')}.zip"
$ARCHIVE_PATH = "$PROJECT_PATH\updates\$ARCHIVE_NAME"

# Проверяем существование архива
if (Test-Path $ARCHIVE_PATH) {
    Write-Host "Архив существует и будет удалён: $ARCHIVE_NAME"
    Remove-Item -Path $ARCHIVE_PATH -Force
}

# Проверяем папку dist
$DIST_PATH = "$PROJECT_PATH\dist"
if (-Not (Test-Path $DIST_PATH)) {
    Write-Host "Ошибка: Папка dist не найдена!"
    exit 1
}

# Проверяем, что папка dist не пуста
if (-Not (Get-ChildItem -Path $DIST_PATH)) {
    Write-Host "Ошибка: Папка dist пуста!"
    exit 1
}

# Очищаем папку images, оставляя только нужную
$IMAGES_PATH = "$DIST_PATH\images"
if (Test-Path $IMAGES_PATH) {
    Write-Host "Очистка папки images, оставляем только $PRELEND..."
    Get-ChildItem -Path $IMAGES_PATH -Directory | Where-Object { $_.Name -ne $PRELEND } | Remove-Item -Recurse -Force
}

# Создаём архив
Compress-Archive -Path "$DIST_PATH\*" -DestinationPath $ARCHIVE_PATH -Force

# Проверяем создание архива
if (-Not (Test-Path $ARCHIVE_PATH)) {
    Write-Host "Ошибка: Архив не найден!"
    exit 1
}

Write-Host "Сборка завершена: $ARCHIVE_NAME."

# API-ключ Asana
$ASANA_API_KEY = "2/1207383441291604/1209227316720762:2f889568e8ae32535f547b5a18912c78"

# Параметры запроса
$headers = @{
    "Authorization" = "Bearer $ASANA_API_KEY"
}

# Отправка файла в Asana
Write-Host "Отправка архива в Asana..."
$uri = "https://app.asana.com/api/1.0/tasks/$TASK_ID/attachments"

# Создаем объект для отправки файла
$body = @{
    file = Get-Item $ARCHIVE_PATH
}

# Выполняем запрос
$response = Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Form $body

# Проверяем результат
if ($response.data) {
    Write-Host "Архив $ARCHIVE_NAME успешно прикреплен к задаче $TASK_ID."
} else {
    Write-Host "Ошибка при отправке архива в Asana."
}
