import { NextApiRequest, NextApiResponse } from "next";
export type IMiddleware<T = any> = (req?: NextApiRequest, res?: NextApiResponse<T>, next?: IMiddleware) => Promise<any> | any;
export type IHandleError = (req: NextApiRequest, res: NextApiResponse, err: any) => any;
export type IRouter = (...middlewares: IMiddleware[]) => IMiddleware;
export type INextCompose = (handleError: IHandleError) => IRouter;
export declare const nextCompose: INextCompose;
export declare const router: IRouter;
