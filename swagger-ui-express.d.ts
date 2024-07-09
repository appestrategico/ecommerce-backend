declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  const serve: RequestHandler;
  function setup(swaggerDoc: any, options?: any): RequestHandler;
  export { serve, setup };
}