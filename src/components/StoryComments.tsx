import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Ids } from '../models';
import Comments from './Comments';
import Story from './Story';

const StoryComments: React.FC<RouteComponentProps> = ({
  history: {
    location: {
      state: { story, commentsIds },
    },
  },
}) => (
  <>
    <Story {...story} />
    <br />
    <br />
    <br />
    <Comments commentsIds={commentsIds as Ids} />
  </>
);

export default StoryComments;
