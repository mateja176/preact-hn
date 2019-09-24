import React from 'react';
import {
  AsyncProps,
  IfFulfilled,
  IfPending,
  IfRejected,
  useAsync,
} from 'react-async';
import { Id } from '../models';
import { fetchJSON } from '../utils';
import StoryContainer from './containers/StoryContainer';

interface Pagination {
  page: number;
  pageSize: number;
}

interface IdsMap {
  [ordinal: string]: Id;
}

const promiseFn = ({ page, pageSize }: AsyncProps<Pagination>) =>
  fetchJSON(
    `/topstories.json?orderBy="$key"&startAt="${page}"&endAt="${pageSize}"`,
  );

const TopStories: React.FC = () => {
  const pageSize = 25;
  const [page, setPage] = React.useState(0);

  const state = useAsync<IdsMap>({
    // * the type of the promiseFn args
    // * corresponds to the additional values passed to async options
    // * and not to the type of the return data
    promiseFn: promiseFn as any,
    page,
    pageSize,
  });

  return (
    <>
      <IfPending state={state}>Loading top stories...</IfPending>
      <IfRejected state={state}>
        {() => <>Error while loading top stories, please retry.</>}
      </IfRejected>
      <IfFulfilled state={state}>
        {data => {
          const entries = Object.entries(data);

          return entries.map(([ordinal, id]) => (
            <div key={id} style={{ display: 'flex', marginBottom: 20 }}>
              <h2 style={{ marginRight: 10 }}>{parseInt(ordinal) + 1}.</h2>
              <StoryContainer id={id} />
            </div>
          ));
        }}
      </IfFulfilled>
    </>
  );
};

export default TopStories;
