import { Request } from 'express';

export interface IMiddleWareReq extends Request {
  user?: { userId: string };
  cookies: Record<string, string>;
}
