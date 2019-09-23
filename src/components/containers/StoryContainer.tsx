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
import Story from '../Story';

const fetchItem = ({ id }: AsyncProps<IStory>) => fetchJSON(`/item/${id}.json`);

const StoryContainer: React.FC<WithId> = ({ id }) => {
  const state = useAsync<IStory>({ promiseFn: fetchItem, id });

  return (
    <>
      <IfPending state={state}>Loading story...</IfPending>
      <IfRejected state={state}>
        {() => <>Error while loading story, please retry.</>}
      </IfRejected>
      <IfFulfilled state={state}>
        {story => <Story {...story}></Story>}
      </IfFulfilled>
    </>
  );
};

export default StoryContainer;
