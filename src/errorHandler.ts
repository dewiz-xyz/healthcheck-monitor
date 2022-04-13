import { NextFunction, Request, Response } from "express";

const isBodyParserError = (error: any) => {
  const bodyParserCommonErrorsTypes = [
    'encoding.unsupported',
    'entity.parse.failed',
    'entity.verify.failed',
    'request.aborted',
    'request.size.invalid',
    'stream.encoding.set',
    'parameters.too.many',
    'charset.unsupported',
    'encoding.unsupported',
    'entity.too.large'
  ];
  return bodyParserCommonErrorsTypes.includes(error.type);
}

export const bodyParserErrorHandler = (
  {
    onError = (err: any, req: Request, res: Response) => {
    },
    errorMessage = (err: any) => {
      return `Body Parser failed to parse request --> ${err.message}`;
    }
  } = {}) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err && isBodyParserError(err)) {
      onError(err, req, res);
      res.status(err.status);
      res.send({ message: errorMessage(err) });
    } else next(err)
  }
}
