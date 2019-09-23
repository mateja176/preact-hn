import { IComment } from '../../models';
import Comment from '../Comment';
import { withItemLoader } from '../HOC';

const minCommentHeight = 68;

export default withItemLoader<IComment>({ height: minCommentHeight })(Comment);
