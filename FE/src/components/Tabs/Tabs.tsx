import React from 'react'

import PropTypes from 'prop-types';
import { Tabs as TabsAnt } from 'antd';

import './Tabs.less';


const Tabs = (props) => {
    const { size, items, type } = props;

    return (
        <TabsAnt
            className={type ? `custom-tabs-${type}`: 'custom-tabs'}
            defaultActiveKey="1"
            type={type}
            size={size}
            style={{ marginBottom: 32 }}
            items={items}
        />
    )
}

Tabs.propTypes = {
    size: PropTypes.string,
    items: [{
        label: PropTypes.string,
        key: PropTypes.number,
        children: PropTypes.element
    }],
    type: PropTypes.string,
}

Tabs.defaultProps = {
    size: 'small',
    items: [{
        label: 'Card Tab',
        key: 1,
        children: 'Content children 1'
    },
    {
        label: 'Card Tab',
        key: 2,
        children: 'Content children 2'
    },
    ],
    type: ''

}
export default Tabs
