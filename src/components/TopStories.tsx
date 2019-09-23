import React from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { Ids } from '../models';
import { fetchJSON } from '../utils';
import StoryContainer from './containers/StoryContainer';

const promiseFn = () =>
  fetchJSON('/topstories.json?orderBy="$key"&limitToFirst=30');

const TopStories: React.FC = () => {
  const state = useAsync<Ids>({
    promiseFn,
  });

  return (
    <>
      <IfPending state={state}>Loading top stories...</IfPending>
      <IfRejected state={state}>
        {() => <>Error while loading top stories, please retry.</>}
      </IfRejected>
      <IfFulfilled state={state}>
        {ids => ids.map(id => <StoryContainer key={id} id={id} />)}
      </IfFulfilled>
    </>
  );
};

export default TopStories;
