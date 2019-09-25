import React from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Id } from '../models';
import { fetchJSON } from '../utils';
import StoryContainer, { minStoryHeight } from './containers/StoryContainer';
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

const promiseFn = () => fetchJSON('/topstories.json');

const TopStories: React.FC = () => {
  const pageSize = 25;
  const [page, setPage] = React.useState<Pagination['page']>(0);

  const [trackReload, triggerReload] = React.useState(false);

  const state = useAsync<IdsMap>({
    promiseFn,
    watch: trackReload,
  });

  const startAt = page * pageSize;
  const endAt = startAt + pageSize;

  return (
    <div>
      <div style={{ minHeight: minStoryHeight * pageSize }}>
        <IfPending state={state}>
          <MessageContainer>Loading top stories...</MessageContainer>
        </IfPending>
        <IfRejected state={state}>
          {() => (
            <MessageContainer>
              Error while loading top stories,&nbsp;
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => {
                  triggerReload(!trackReload);
                }}
              >
                please retry
              </span>
            </MessageContainer>
          )}
        </IfRejected>
        <IfFulfilled state={state}>
          {data => {
            const entries = Object.entries(data);

            return entries.slice(0, endAt).map(([ordinal, id]) => (
              <div key={id} style={{ display: 'flex', marginBottom: 20 }}>
                <h4 style={{ marginRight: 10 }}>{parseInt(ordinal) + 1}.</h4>
                <StoryContainer id={id} />
              </div>
            ));
          }}
        </IfFulfilled>
      </div>
      <ButtonGroup style={{ marginTop: 30 }}>
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page > topStoriesTotal / pageSize - 1 || state.isPending}
        >
          Load more
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TopStories;
