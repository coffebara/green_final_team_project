import React, { useState } from "react";
import "./COFormInput.scss";
const COFormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        if(inputProps.pattern) {
            setFocused(e.target.validity.patternMismatch)
        }
        setFocused(true);
    };
    // let a = RegExp(inputProps.pattern)
    // console.log(a.test(eval(0o10)));
    return (
        <div className="formInput">
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={handleFocus}
                focused={focused.toString()}
            />
            <span className="errorMessage">{errorMessage}</span>
        </div>
    );
};

export default COFormInput;
