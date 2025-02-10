import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

const IconAnt = (props) => {
    const { iconName } = props
    return (
        <Icon type={iconName}/>
    )   
}

IconAnt.propTypes = {
    type: PropTypes.string,
}

IconAnt.defaultProps = {

}

export default IconAnt;