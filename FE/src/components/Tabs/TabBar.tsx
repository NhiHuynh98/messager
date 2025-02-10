import React from 'react'

import PropTypes from 'prop-types';
import { Tabs as TabsAnt } from 'antd';


import type { TabsProps } from 'antd';
import StickyBox from 'react-sticky-box';

const TabBar = (props) => {
    const { size, items, tabBarExtraContent } = props;

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} />
    </StickyBox>
  );

    return (
        <TabsAnt
            className='custom-tabs'
            defaultActiveKey="1"
            size={size}
            style={{ marginBottom: 32 }}
            items={items}
        />
    )
}

TabBar.propTypes = {
    size: PropTypes.string,
    items: [{
        label: PropTypes.string,
        key: PropTypes.number,
        children: PropTypes.element
    }],
    tabBarExtraContent: PropTypes.element
}

TabBar.defaultProps = {
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
    tabBarExtraContent: ''

}
export default TabBar
