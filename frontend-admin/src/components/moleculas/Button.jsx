import React from 'react'
import clsx from 'clsx';
function Button({ children, variant, className, ...props }) {

    const baseClasses = "text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2"

    const variantClasses = {
        primary: "bg-gray-800 hover:bg-gray-900",
        success: "bg-green-800 hover:bg-green-900",
        danger: "bg-red-800 hover:bg-red-900"
    }


    const classes = clsx(
        baseClasses,
        variantClasses[variant],
        className
    );


    return (
        <button {...props} className={classes}>
            {children}
        </button>
    );
}

export default Button