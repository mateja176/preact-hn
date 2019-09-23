import React from 'react';
import {
  AsyncProps,
  IfFulfilled,
  IfPending,
  IfRejected,
  useAsync,
} from 'react-async';
import { IStory, WithId } from '../../models';
import { fetchJSON } from '../../utils';
import MessageContainer from '../MessageContainer';
import Story from '../Story';

const minStoryHeight = 46;

const fetchItem = ({ id }: AsyncProps<IStory>) => fetchJSON(`/item/${id}.json`);

const StoryContainer: React.FC<WithId> = ({ id }) => {
  const state = useAsync<IStory>({ promiseFn: fetchItem, id });

  return (
    <>
      <IfPending state={state}>
        <MessageContainer height={minStoryHeight}>
          Loading story...
        </MessageContainer>
      </IfPending>
      <IfRejected state={state}>
        {() => (
          <MessageContainer height={minStoryHeight}>
            Error while loading story, please retry.
          </MessageContainer>
        )}
      </IfRejected>
      <IfFulfilled state={state}>
        {story => <Story {...story}></Story>}
      </IfFulfilled>
    </>
  );
};

export default StoryContainer;
