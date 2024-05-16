const Label = ({ children, className, ...props }) => {
    const defaultStyles = "text-sm";
    return (
        <label {...props} className={`${defaultStyles} ${className}`}>
            {children}
        </label>
    );
}

export default Label;