<p align="center">
  <a href="https://schedule.rpcot.ru"><img src="https://api.rpcot.ru/images/rasp-logo" alt="SCHEDLY Logo" /></a>
</p>

<h1 align="center">SCHEDLY — Frontend</h1>

<div align="center">
  Веб-интерфейс для удобного просмотра актуальной информации.
</div>

## О проекте
Это фронтенд-часть экосистемы SCHEDLY. Сайт предоставляет визуальный и интуитивно понятный способ взаимодействия с расписанием, которое заполняется учениками. Проект адаптирован под мобильные устройства и десктопы, обеспечивая быстрый доступ к информации без регистрации.

## Основные технологии
- React 19
- Chakra UI v2 (стилизация и компоненты)
- React Router v7 (навигация)
- Vite (сборка проекта)

## Запуск проекта

### Настройка окружения
Создайте файл .env в корневом каталоге и укажите адрес вашего API:
```
VITE_API_BASE=http://your-api-address:port
```

### Установка и запуск
1. Клонируйте репозиторий:
```bash
git clone https://github.com/rpcot/schedly-frontend.git
cd schedly-frontend
```

2. Установите зависимости:
```bash
yarn install
```

3. Запустите режим разработки:
```bash
yarn dev
```

4. Сборка для продакшена:
```bash
yarn build
```

## Связанные проекты
- SCHEDLY Backend (https://github.com/rpcot/schedly) — API и Telegram бот.