export type Id = number;
export type Ids = Id[];

export interface IStory {
  id: Id;
  title: string;
  kids?: Ids;
  score: number;
  url?: string;
  by: string;
}

export type IStories = IStory[];

export interface IComment {
  id: Id;
  text: string;
  by: string;
  kids: Ids;
}

export type IComments = IComment[];

export interface WithId {
  id: Id;
}

export const api = 'https://hacker-news.firebaseio.com/v0';
