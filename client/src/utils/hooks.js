"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = require("react");
const useForm = (callback, initialState = {}) => {
    const [values, setValues] = (0, react_1.useState)(initialState);
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };
    return {
        onChange,
        onSubmit,
        values
    };
};
exports.useForm = useForm;
