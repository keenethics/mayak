import { useState } from 'react';
import { TruncatedList } from 'react-truncate-list';
import { Tooltip } from 'react-tooltip';
import PropTypes from 'prop-types';
import 'react-truncate-list/dist/styles.css';
import { cn } from '@utils/cn';
import { Caption, Paragraph } from '@components/Typography';

function Method({ id, title, description }) {
  return (
    <div className="grid h-[24px] w-fit place-items-center rounded-3xl bg-primary-100">
      <span className="text-c3 w-full px-3 py-1 font-medium text-primary-600" data-tooltip-id={`method_tooltip_${id}`}>
        {title}
      </span>
      <Tooltip
        id={`method_tooltip_${id}`}
        style={{ backgroundColor: '#FFF', color: '#080809', boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.2)' }}
        place="bottom"
        opacity={1}
      >
        <Paragraph className="max-w-64 md:max-w-80">{description}</Paragraph>
      </Tooltip>
    </div>
  );
}
Method.propTypes = { id: PropTypes.string, title: PropTypes.string, description: PropTypes.string };

export function MethodList({ methods }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2 border-t pt-3">
      <Caption className="text-p4 font-bold text-gray-600">Напрямки лікування</Caption>
      <TruncatedList
        alwaysShowTruncator
        className={cn('flex flex-wrap gap-[8px]', expanded ? 'max-h-none' : 'max-h-14 md:max-h-6')}
        renderTruncator={({ hiddenItemsCount }) => {
          if (hiddenItemsCount > 0) {
            return (
              <span className="text-c3 cursor-pointer text-gray-900" onClick={() => setExpanded(true)}>
                +{hiddenItemsCount}
              </span>
            );
          }
          return null;
        }}
      >
        {methods.map(({ id, ...rest }) => (
          <Method key={id} id={id} {...rest} />
        ))}
      </TruncatedList>
    </div>
  );
}
MethodList.propTypes = {
  methods: PropTypes.arrayOf(Method.propTypes),
};
