import React, { forwardRef } from 'react'

const InputFile = forwardRef((props, ref) => {
  return (
    <input {...props} ref={ref} className={"block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5 " + (props.className || '')} type="file" />
  )
})

export default InputFile