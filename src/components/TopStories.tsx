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
import MessageContainer from './MessageContainer';

// * current number of total story ids returned without filtering
const topStoriesTotal = 500;

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
    <div>
      <IfPending state={state}>
        <MessageContainer>Loading top stories...</MessageContainer>
      </IfPending>
      <IfRejected state={state}>
        {() => (
          <MessageContainer>
            Error while loading top stories, please retry.
          </MessageContainer>
        )}
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
      <div style={{ marginTop: 30 }}>
        <button
          style={{ marginRight: 10 }}
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page < 1 || state.isPending}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page > topStoriesTotal / 25 - 1 || state.isPending}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopStories;
