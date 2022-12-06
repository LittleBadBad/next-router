# next-compose-router

Create [koa-router](https://github.com/koajs/router) like handler for next.js.

## Installation

```
$ npm install next-compose-router
```

## Why not middleware

Sometimes not all api need some validation operates, and as my Koa develop experiences, I prefer defining some apis'
preprocessing separately and flexibly. So I write this toolkit to handle this

## Maintainers

- [@littlebadbad](https://github.com/LittleBadBad)

## API

### router

Create a next handler composed with multi middlewares

```js
export default router(checkAuth, checkParams, (req, res) => {
    // write handler here
    res.send("success")
})

export const FORBIDDEN = {message: "forbidden", status: 403}

export const BAD_REQUEST: IError = {message: "bad request", status: 400}

async function checkAuth(req, res, next) {
    const token = req.headers.authorization
    if (valid(token)) { // valid token here
        await next()
    } else {
        throw FORBBIDEN
    }
}

async function checkParams(req, res, next) {
    const params = req.query
    if (valid(params)) { // valid params here
        await next()
    } else {
        throw BAD_REQUEST
    }
}

```

### nextCompose

Used to define self error handler

```js
// default
const router = nextCompose((req, res, err) => {
    throw err
})

const myRouter = nextCompose((req, res, {status, message}) => {
    res.statusCode = status || 500
    res.send({
        error: {
            status: status || 500,
            message: status ? message : "internal error"
        }
    })
})
```

## License

MIT
