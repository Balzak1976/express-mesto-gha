# Проект Mesto бэкенд

## Описание и функциональность проекта

### Backend

- Написан основной функционал сервера на Express
- Сделано подключение сервера к базе данных MongoDB
- Использован пакет Mogoose, который обеспечивает правильную структуру документов в БД и позволяет их валидировать во время добавления и обновления данных
- Настроена обработка ошибок сервера ( 400, 404, 500 )

## Стэк технологий

| <a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="45" /></a> | <a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="45" /></a> | <a href="https://www.mongodb.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg" alt="MongoDB" height="45" /></a> |
| :---: | :---: | :---: |
| Express | Node.js | MongoDB |

<br>

## Запуск проекта в режиме production

клонировать репозиторий 

```javascript
git clone https://github.com/Balzak1976/express-mesto-gha.git
```

установить зависимости

```javascript
npm ci
```

создать файл `.env` в корне проекта

```javascript
PORT = 3000;
MONGO_URL = "mongodb://0.0.0.0:27017/mestodb";
SECRET_KEY = "some-secret-key";
```

запустить

```javascript
npm run start
```
