import { ifElse } from 'ramda';

export const checkErrorCode = (res: Response) =>
  res.status >= 400 && res.status <= 500;

export const throwError = async (res: Response) => new Error(await res.text());

export const jsonRes = (res: Response) => res.json();

export const getJsonOrThrow = ifElse(checkErrorCode, throwError, jsonRes);
