import React, { forwardRef } from 'react';

const Select = forwardRef(({ children, ...props }, ref) => {
  return (
    <select {...props} ref={ref} className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ' + (props.className || '')} >
      {children}
    </select>
  );
});

export default Select;