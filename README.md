# BoilerPlate Node Express With Authentication

A boilerplate Node.js built with Express. 

## Installing
`npm install`

In the DB Config `{ProjectRoot}/config/db.js` file insert your local dev database settings.
```
    HOST: "localhost",
    USER: "username",
    PASSWORD: "securePassword",
    DB: "databaseName",
    dialect: "mysql",
```

Create a new file `{ProjectRoot}/.env` <br>
Copy Contents from `{ProjectRoot}/env.sample` <br>
Generate random values for the `JWT_SEC` and `ENCRYPT` constants.


## Running
`npm run dev`

## Contributing
Any and all suggestions and pull requests are welcome. 