const hackerNewsApi = 'https://hacker-news.firebaseio.com/v0';

export const fetchJSON = (...args: Parameters<typeof fetch>) => {
  const [url, ...options] = args;

  return fetch(`${hackerNewsApi}${url}`, ...options).then(res => res.json());
};
