import { memo } from 'react';
import { IStory } from '../../models';
import { withItemLoader } from '../HOC';
import Story from '../Story';

export const minStoryHeight = 46;

export default memo(
  withItemLoader<IStory>({
    height: minStoryHeight,
  })(Story),
);
