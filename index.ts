import {NextApiRequest, NextApiResponse} from "next";

export type IMiddleware<T = any> =
    (req: NextApiRequest,
     res: NextApiResponse<T>,
     next: Function) => Promise<any> | any

export type IHandleError = (req: NextApiRequest,
                            res: NextApiResponse, err: any) => any
export type IRouter = (...middlewares: IMiddleware[]) => IMiddleware

export type INextCompose = (handleError: IHandleError) => IRouter

export const nextCompose: INextCompose =
    (handleError) =>
        (...middlewares) => {
            if (!Array.isArray(middlewares)) throw new TypeError('Middleware stack must be an array!')
            for (const fn of middlewares) {
                if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
            }
            return async function handler(req, res, next) {
                let index = -1
                return dispatch(0)

                async function dispatch(i) {
                    if (i <= index) return handleError(req, res, new Error('next() called multiple times'))
                    index = i
                    let fn: Function = middlewares[i]
                    if (i === middlewares.length) fn = next
                    if (!fn) return
                    try {
                        return await fn(req, res, dispatch.bind(null, i + 1))
                    } catch (err) {
                        return handleError(req, res, err)
                    }
                }
            }
        }

export const router = nextCompose((req, res, err) => {
    throw err
})
