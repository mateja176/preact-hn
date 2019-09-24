import React from 'react';
import { Link } from 'react-router-dom';
import { IStory } from '../models';

const Story: React.FC<IStory> = story => {
  const { id, title, url, by, score, kids = [] } = story;

  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h4>
          {title} {url && <small>({new URL(url).hostname})</small>}
        </h4>
      </a>
      <div style={{ color: 'dimgrey' }}>
        <strong>{score}</strong> points by <i>{by}</i>
        {!!kids.length && (
          <span style={{ marginLeft: 5 }}>
            |{' '}
            <Link
              to={{
                pathname: `/${id}/comments`,
                state: {
                  story,
                  commentsIds: kids,
                },
              }}
            >
              {kids.length} comments
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

Story.displayName = 'story';

export default Story;
