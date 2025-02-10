import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';


const { TextArea : TextAreaCustom } = Input;

export interface Props {
    name: string;
}

function TextArea(props) {
    const { showCount, maxLength, placeholder, style, value, onChange, name } = props;

    const handleChange = (event: any) => {
        console.log("value", event.target.value);
        const { value, name } = event;
        onChange([name, value]);
    }

    return (
        <>
            <TextAreaCustom
                showCount={showCount}
                maxLength={maxLength}
                onChange={handleChange}
                placeholder={placeholder}
                style={style}
                name={name}
                value={value}
            />
        </>
        
    )
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    maxLength: PropTypes.number,
    showCount: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string
}


TextArea.defaultProps = {
    placeholder: 'Test Area',
    onChange: function(){ alert("Hello"); },
    maxLength: 100,
    showCount: true,
    style: {},
    value: '',
    name: ''
};
 

export default TextArea