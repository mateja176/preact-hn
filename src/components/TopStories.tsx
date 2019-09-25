import React from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { Ids } from '../models';
import { fetchJSON } from '../utils';
import StoryContainer, { minStoryHeight } from './containers/StoryContainer';
import Err from './Err';
import Spinner from './Spinner';

interface Pagination {
  page: number;
  pageSize: number;
}

const promiseFn = () => fetchJSON('/topstories.json');

const TopStories: React.FC = () => {
  const pageSize = 25;
  const [page, setPage] = React.useState<Pagination['page']>(0);

  const state = useAsync<Ids>({
    promiseFn,
  });

  const boundary = React.useRef<HTMLDivElement>(null);

  const incrementPage = () => {
    setPage(oldPage => oldPage + 1);
  };

  const { isPending, data } = state;

  const hasNextPage = !isPending && data && page < data.length / pageSize;

  React.useEffect(() => {
    const incrementPageOnScroll = () => {
      const { bottom } = boundary.current!.getBoundingClientRect();
      const { innerHeight } = window;

      if (hasNextPage && bottom <= innerHeight) {
        incrementPage();
      }
    };

    window.addEventListener('scroll', incrementPageOnScroll);

    return () => {
      window.removeEventListener('scroll', incrementPageOnScroll);
    };
  }, [hasNextPage]);

  const startAt = page * pageSize;
  const endAt = startAt + pageSize;

  return (
    <div>
      <div style={{ minHeight: minStoryHeight * pageSize }}>
        <IfPending state={state}>
          <Spinner>{'Loading top stories...'}</Spinner>
        </IfPending>
        <IfRejected state={state}>
          {() => (
            <Err
              message="Error while loading top stories"
              action={() => {
                state.reload();
              }}
              actionText="please retry"
            />
          )}
        </IfRejected>
        <IfFulfilled state={state}>
          {data => {
            return data.slice(0, endAt).map((id, i) => (
              <div key={id} style={{ display: 'flex', marginBottom: 20 }}>
                <h4 style={{ marginRight: 10 }}>{i + 1}.</h4>
                <StoryContainer id={id} />
              </div>
            ));
          }}
        </IfFulfilled>
      </div>
      <div ref={boundary} style={{ height: 1 }} />
    </div>
  );
};

export default TopStories;
