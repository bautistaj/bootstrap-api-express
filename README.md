
# bootstrap-api-express

With this package you can create a basic structure of api project with [express](https://www.npmjs.com/package/express) and [body-parser](https://www.npmjs.com/package/body-parser).

The package crete the next structure:
```bash
.
|____.git
|____.gitignore
|____components
| |____example
| | |____controller.js
| | |____network.js
|____index.js
|____package-lock.json
|____package.json
|____response
| |____response.js

```
## Install

```npm
npm install -g bootstrap-api-express
```

# Usage

```bash
mkdir api
cd api
```

Execute **bootstrap-api-express** specifying the end-points you want to create, for example users and chats.

```bash
bootstrap-api-express users chats
```
The package will create the end-points for user and chats, **if you don't specify anything the package will create the example end-point**.

Run the next command and check the end-points created.
```bash
node index.js
```

```
GET    api/users/
POST   api/users/
DELETE api/users/:id
UPDATE api/users/:id

GET    api/chats/
POST   api/chats/
DELETE api/chats/:id
UPDATE api/chats/:id
```

# Contributing
If someone wants to add or improve something, I invite you to collaborate directly in this repository: [bootstrap-api-express](https://github.com/bautistaj/bootstrap-api-express.git)

# License
create-api-express is released under the [MIT License](https://opensource.org/licenses/MIT).