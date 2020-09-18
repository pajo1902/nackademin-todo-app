# nackademin-todo-app

1. npm i in terminal
2. create a new .env-file with a secret
3. npm start in terminal
4. register new user
5. create new lists
6. create new items

and enjoy!

PS. There is no frontend at this moment. Using Postman is recommended. DS.

- Register new user            POST http://localhost:3001/users/register
- Login in user                POST http://localhost:3001/users/auth/login
- Delete your user account   DELETE http://localhost:3001/users/id
- Get all your data             GET http://localhost:3001/users/getdata/id
- Get all todo items            GET http://localhost:3001/todos/
- Get one specific todo item    GET http://localhost:3001/todos/id
- Create a new todo item       POST http://localhost:3001/todos/
- Update a todo item            PUT http://localhost:3001/todos/id
- Remove a todo item         DELETE http://localhost:3001/todos/id

- Read about privacy policy     GET http://localhost:3001/privacypolicy/