import React from 'react';

import { Input as InputAnt } from "antd";
import PropTypes from 'prop-types';
import Copy from '../CopyToClipboard/Copy';

const Input = ({ onChange, onKeyDown, value, placeholder, variant, name, allowClear, disabled, classNames, defaultValue, maxLength, size, suffix }) => {
    const handeChange = (event: any) => {
        const { value, name } = event?.target;
        console.log("value", value, name);
        onChange(event);
    }

    return (
        <>
        <InputAnt
            value={value}
            placeholder={placeholder}
            variant={variant}
            name={name}
            onChange={(e) => handeChange(e)}
            allowClear={allowClear}
            disabled={disabled}
            classNames={classNames}
            defaultValue={defaultValue}
            maxLength={maxLength}
            size={size}
            suffix={suffix}
            onKeyDown={onKeyDown}
        />
        </>
        

    );
}

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    variant: PropTypes.oneOf(['outlined', 'borderless', 'filled']), 
    onChange: PropTypes.func,
    name: PropTypes.string,
    allowClear: PropTypes.bool,
    disabled: PropTypes.bool,
    classNames: PropTypes.string,
    defaultValue: PropTypes.string,
    maxLength: PropTypes.number,
    size: PropTypes.oneOf(['large', 'middle', 'small']),
    suffix: PropTypes.element,
    onKeyDown: PropTypes.func
}

Input.defaultProps = {
    value: '',
    placeholder: '',
    variant: 'outlined',
    onChange: () => {},
    name: '',
    allowClear: false,
    disabled: false,
    classNames: '',
    defaultValue: '',
    size: 'middle',
    suffix: null,
    maxLength: 100000000000,
    onKeyDown: () => {}
  };
 
export default Input;