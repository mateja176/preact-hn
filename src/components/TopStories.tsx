import React from 'react';
import {
  AsyncProps,
  IfFulfilled,
  IfPending,
  IfRejected,
  useAsync,
} from 'react-async';
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

const promiseFn = ({ page, pageSize }: AsyncProps<Pagination>) => {
  const startAt = page * pageSize;
  const endAt = startAt + pageSize - 1;

  return fetchJSON(
    `/topstories.json?orderBy="$key"&startAt="${startAt}"&endAt="${endAt}"`,
  );
};

const TopStories: React.FC = () => {
  const pageSize = 25;
  const [page, setPage] = React.useState(0);

  const [trackReload, triggerReload] = React.useState<-1 | 1>(-1);

  const state = useAsync<IdsMap>({
    // * the type of the promiseFn args
    // * corresponds to the additional values passed to async options
    // * and not to the type of the return data
    promiseFn: promiseFn as any,
    page,
    pageSize,
    watch: page + Number(trackReload),
  });

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
                  triggerReload(trackReload > 0 ? -1 : 1);
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

            return entries.map(([ordinal, id]) => (
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
            setPage(page - 1);
          }}
          disabled={page < 1 || state.isPending}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page > topStoriesTotal / pageSize - 1 || state.isPending}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TopStories;
