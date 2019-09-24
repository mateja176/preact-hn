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
  <div>
    <Story {...story} />
    <br />
    <br />
    <br />
    <Comments commentsIds={commentsIds as Ids} />
  </div>
);

export default StoryComments;
