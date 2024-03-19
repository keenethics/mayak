import PropTypes from 'prop-types';
import SadIcon from '@icons/sad-search.svg';

export function NoInfoToShow({ text }) {
  return (
    <div className="no-wrap lg:w-max-[900px] flex h-[250px] w-full flex-shrink-0 flex-col items-center justify-center gap-4 bg-gray-100 md:h-[300px] md:gap-10 lg:h-[400px] lg:gap-10">
      <SadIcon className="h-[77px] w-[77px] text-gray-300 md:h-[121px] md:w-[121px] lg:h-[121px] lg:w-[121px]" />
      <p className="text-center text-p4 font-normal text-primary-600">Немає {text} для відображення</p>
    </div>
  );
}

NoInfoToShow.propTypes = {
  text: PropTypes.string,
};
