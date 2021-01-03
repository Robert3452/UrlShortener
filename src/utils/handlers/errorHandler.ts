import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

import boom from '@hapi/boom';

function withErrorStack(error: ErrorRequestHandler, stack: any) {
    if (process.env.DEV)
        return { ...error, stack }
    return error
}

export function logErrors(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    return next(error);
}

export function wrapErrors(error: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) {
    //MongoDB error
    if (error.hasOwnProperty('_message') || error.hasOwnProperty('path') || error.hasOwnProperty('kind'))
        return next(boom.badRequest(error));

    if (!error.isBoom)
        return next(boom.badImplementation(error));

    return next(error);

}

export function errorHandler(error: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) {
    const {
        output: { statusCode, payload }
    } = error;

    return res.status(statusCode).json(withErrorStack(payload, error.stack))

}