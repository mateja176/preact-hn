import React from 'react';
import { Ids, IStories } from '../models';
import { fetchJSON } from '../utils';
import Story from './Story';

const TopStories: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [stories, setStories] = React.useState<IStories>([]);

  React.useEffect(() => {
    setLoading(true);
    // TODO unbatch requests
    fetchJSON('/topstories.json?orderBy="$key"&limitToFirst=30')
      .then((ids: Ids) =>
        Promise.all(ids.map(id => fetchJSON(`/item/${id}.json`))),
      )
      .then((topStories: IStories) => {
        setLoading(false);
        setStories(topStories);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, []);

  return (
    <>
      {loading && 'Loading top stories...'}
      {error && 'Error while loading top stories please retry'}
      {stories.map(story => (
        <Story key={story.id} {...story} />
      ))}
    </>
  );
};

export default TopStories;
