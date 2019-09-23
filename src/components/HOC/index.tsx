import React from 'react';
import {
  AsyncProps,
  IfFulfilled,
  IfPending,
  IfRejected,
  useAsync,
} from 'react-async';
import { getDisplayName, wrapDisplayName } from 'recompose';
import { WithId } from '../../models';
import { fetchJSON } from '../../utils';
import MessageContainer from '../MessageContainer';

const promiseFn = <Item extends WithId>({ id }: AsyncProps<Item>) =>
  fetchJSON(`/item/${id}.json`);

export interface ItemLoaderConfig {
  height: Required<React.CSSProperties>['height'];
}
export const withItemLoader = <Item extends WithId>({
  height,
}: ItemLoaderConfig) => <Props extends Item>(
  Component: React.ComponentType<Props>,
) => {
  const name = getDisplayName(Component) || 'Item';

  const WithItemLoader: React.FC<Omit<Props, keyof Item> & WithId> = ({
    id,
    ...props
  }) => {
    const state = useAsync<Item>({ promiseFn, id });

    return (
      <>
        <IfPending state={state}>
          <MessageContainer height={height}>Loading {name}...</MessageContainer>
        </IfPending>
        <IfRejected state={state}>
          {() => (
            <MessageContainer height={height}>
              Error while loading ${name}, please retry.
            </MessageContainer>
          )}
        </IfRejected>
        <IfFulfilled state={state}>
          {item => <Component {...({ ...item, ...props } as Props)} />}
        </IfFulfilled>
      </>
    );
  };

  WithItemLoader.displayName = wrapDisplayName(Component, `${name} loader`);

  return WithItemLoader;
};
