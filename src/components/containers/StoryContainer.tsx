import { IStory } from '../../models';
import { withItemLoader } from '../HOC';
import Story from '../Story';

const minStoryHeight = 46;

export default withItemLoader<IStory>({
  height: minStoryHeight,
})(Story);
