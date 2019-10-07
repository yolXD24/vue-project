# my-new-project

## Project setup
```
npm install --save
```
### Installing dependencies at backend side
```
cd api
npm install --save
```
- Make a document in database the same schema structure below:
```
"account": {
    "username": "admin",
    "password": "admin"
  },
  "name": {
    "firstname": "Admin",
    "lastname": null
  },
  "email": null,
  "position": null,
  "__v": 0
```
### Compile front-end for hot reloading
```
npm run serve
```
### Running the back-end server
```
cd api
node server.js
```
### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
