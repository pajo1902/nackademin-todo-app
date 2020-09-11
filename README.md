# nackademin-todo-app

1. npm i in terminal
2. create a new .env-file with a secret
3. nodemon app.js in terminal
4. register new users with either admin or writer as roles
5. create new items

and enjoy!

PS. There is no frontend at this moment. Using Postman is recommended. DS.

- Register new user          http://localhost:3001/users/register
- Login in user              http://localhost:3001/users/auth/login
- Delete your user account   http://localhost:3001/users/remove/id
- Get all your data          http://localhost:3001/users/getdata/id
- Get all todo items         http://localhost:3001/items/all
- Get one specific todo item http://localhost:3001/items/id
- Create a new todo item     http://localhost:3001/items/create
- Update a todo item         http://localhost:3001/items/update/id
- Remove a todo item         http://localhost:3001/items/remove/id
- Read about data policy     http://localhost:3001/privacypolicy