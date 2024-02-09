import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';

const FormFieldWrapper = ({ title, children, className }) => (
  <div className={cn('w-full', className)}>
    <h3 className="text-p2 font-bold text-primary-700">{title}</h3>
    <div className="mt-2">{children}</div>
  </div>
);

FormFieldWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
};

export { FormFieldWrapper };
