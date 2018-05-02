import { getUserToken } from './token';

export const signPost = (req) => {
  const reqUrl = req.url;
  const authorization = `Bearer ${getUserToken()}`;
  if (getUserToken()) {
    if (req.headers) {
      req.headers.Authorization = authorization;
    } else {
      req.headers = { Authorization: authorization };
    }
  }
  return req;
};

export const signGet = (req) => {
  const reqUrl = req.url;
  if (!req.params) {
    req.params = {};
  }
  const authorization = `Bearer ${getUserToken()}`;
  if (getUserToken()) {
    if (req.headers) {
      req.headers.Authorization = authorization;
    } else {
      req.headers = { Authorization: authorization };
    }
  }
  return req;
};
