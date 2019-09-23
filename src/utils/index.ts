import { api } from '../models';

export const fetchJSON = (...args: Parameters<typeof fetch>) => {
  const [url, ...options] = args;

  return fetch(`${api}${url}`, ...options).then(res => res.json());
};
