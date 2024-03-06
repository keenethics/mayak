import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@components';
import Plus from '@icons/plus.svg';
import Minus from '@icons/minus.svg';

export function FAQCard({ id, question, answer }) {
  return (
    <div className="flex flex-col gap-2 rounded-[40px] border-[1px] border-gray-600 bg-other-white px-6 py-5">
      <div className="group peer relative flex justify-between">
        <input type="checkbox" className="absolute z-[-10]" id={id} />
        <label htmlFor={id} className="cursor-pointer">
          <Paragraph className="text-p1 font-bold text-primary-600">{question}</Paragraph>
        </label>
        <div>
          <label htmlFor={id} className="cursor-pointer">
            <Plus className="group-has-[input:checked]:hidden" />
            <Minus className="hidden group-has-[input:checked]:block" />
          </label>
        </div>
      </div>
      <Paragraph className="hidden text-p2 text-gray-900 peer-has-[input:checked]:inline">{answer}</Paragraph>
    </div>
  );
}

FAQCard.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
