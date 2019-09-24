import React from 'react';
import { Link } from 'react-router-dom';
import { IStory } from '../models';

const Story: React.FC<IStory> = story => {
  const { id, title, url, by, score, kids = [] } = story;

  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h2>
          {title} {url && <small>({new URL(url).hostname})</small>}
        </h2>
      </a>
      <div style={{ color: 'dimgrey' }}>
        <strong>{score}</strong> points by <i>{by}</i>
        {!!kids.length && (
          <>
            {' '}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Story;
