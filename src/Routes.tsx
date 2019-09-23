import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StoryComments from './components/StoryComments';
import TopStories from './components/TopStories';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={TopStories} />
    <Route path="/:id/comments" component={StoryComments} />
  </Switch>
);

export default Routes;
