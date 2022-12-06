"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.nextCompose = void 0;
const nextCompose = (handleError) => (...middlewares) => {
    if (!Array.isArray(middlewares))
        throw new TypeError('Middleware stack must be an array!');
    for (const fn of middlewares) {
        if (typeof fn !== 'function')
            throw new TypeError('Middleware must be composed of functions!');
    }
    return async function handler(req, res, next) {
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
            if (i <= index)
                return handleError(req, res, new Error('next() called multiple times'));
            index = i;
            let fn = middlewares[i];
            if (i === middlewares.length)
                fn = next;
            if (!fn)
                return;
            try {
                return await fn(req, res, dispatch.bind(null, i + 1));
            }
            catch (err) {
                return handleError(req, res, err);
            }
        }
    };
};
exports.nextCompose = nextCompose;
exports.router = (0, exports.nextCompose)((req, res, err) => {
    throw err;
});
