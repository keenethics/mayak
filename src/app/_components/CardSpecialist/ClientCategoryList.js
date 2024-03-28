'use client';

import { useState } from 'react';
import { TruncatedList } from 'react-truncate-list';
import { cn } from '@utils/cn';
import PropTypes from 'prop-types';
import CheckGreen from '@icons/check-green.svg';
import CrossIcon from '@icons/crossSmall.svg';

function Category({ isWorkWith, name }) {
  const isWorkStyle = isWorkWith ? 'bg-other-lightGreen text-primary-600' : 'bg-other-lightRed text-other-black';
  return (
    <div className={cn('grid h-[24px] w-fit place-items-center  rounded-3xl  bg-other-lightGreen', isWorkStyle)}>
      <span className="w-full place-items-center  px-3 py-1 align-middle text-c3 font-medium ">
        {isWorkWith ? (
          <CheckGreen alt="Check Icon" aria-label="Check Icon" className="inline-block h-4 w-4 transition-all" />
        ) : (
          <CrossIcon alt="cross Icon" aria-label="cross Icon" priority="true" className="inline-block" />
        )}

        {name}
      </span>
    </div>
  );
}
Category.propTypes = { name: PropTypes.string, isWorkWith: PropTypes.bool };

export function ClientCategoryList({ clientCategories, isWorkWith }) {
  const [expanded, setExpanded] = useState(false);

  if (clientCategories.length === 0) return undefined;

  const TextTitle = isWorkWith ? 'працює з' : 'не працю з';
  const Title = <h2 className="hidden text-c3 font-bold  uppercase text-gray-600 md:block lg:text-p4">{TextTitle}</h2>;

  return (
    <div className="flex flex-col gap-2 border-t pt-3">
      {Title}
      <TruncatedList
        alwaysShowTruncator
        className={cn('flex flex-wrap gap-[8px]', expanded ? 'max-h-none' : 'max-h-14 md:max-h-6')}
        renderTruncator={({ hiddenItemsCount }) => {
          if (hiddenItemsCount > 0) {
            return (
              <span className="cursor-pointer text-c3 text-gray-900" onClick={() => setExpanded(true)}>
                +{hiddenItemsCount}
              </span>
            );
          }
          return null;
        }}
      >
        {clientCategories.map(({ id, ...rest }) => (
          <Category key={id} isWorkWith={isWorkWith} {...rest} />
        ))}
      </TruncatedList>
    </div>
  );
}
ClientCategoryList.propTypes = {
  clientCategories: PropTypes.arrayOf(Category.propTypes),
  isWorkWith: PropTypes.bool,
};
