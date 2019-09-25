import React from 'react';
import { useFetch } from 'react-async';
import { RouteComponentProps } from 'react-router-dom';
import { api, IStory } from '../models';
import Comments from './Comments';
import Err from './Err';
import Spinner from './Spinner';
import Story from './Story';

const StoryComments: React.FC<RouteComponentProps<{ id: string }>> = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const {
    location: { state = {} },
  } = history;
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [story, setStory] = React.useState<IStory | undefined>(state.story);

  const { run, data, isLoading, error, reload } = useFetch<IStory | null>(
    `${api}/item/${id}.json`,
    {},
    { json: true },
  );

  React.useEffect(() => {
    if (!story) {
      run();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!story && data) {
      setStory(data);
    }
  }, [story, data]);

  const navigateToTopStories = () => history.push('/');
  const navigateToTopStoriesText = 'return to top stories';

  if (!story) {
    if (isLoading) {
      return <Spinner>Loading story with comments...</Spinner>;
    }
    if (error) {
      return (
        <Err
          message="Error while loading story with comments"
          action={run}
          actionText="please retry"
        />
      );
    }
    return (
      <Err
        message={`Story with id "${id}" not found`}
        action={navigateToTopStories}
        actionText={navigateToTopStoriesText}
      />
    );
  }

  return (
    <div>
      <Story {...story} />
      <hr />
      {story.kids ? (
        <Comments commentsIds={story.kids} />
      ) : (
        <Err
          message="Story has no comments"
          action={() => {
            reload();
          }}
          actionText="check for comments"
        />
      )}
    </div>
  );
};
export default StoryComments;
