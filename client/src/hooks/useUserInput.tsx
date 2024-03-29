import { SelectChangeEvent } from "@mui/material";
import React, { useCallback, useState } from "react";

const useUserInput = (validator: (value: string) => {}) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validator(inputValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        setInputValue(e.target.value);
    };

    const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setIsTouched(true);
    };

    const reset = useCallback(() => {
        setInputValue('');
        setIsTouched(false);
    }, []);

    return {
        value: inputValue,
        isValid: valueIsValid,
        hasError,
        setValue: setInputValue,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useUserInput;