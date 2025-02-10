import React from 'react';

import { Breadcrumb as BreadcrumbAnt, Divider } from 'antd';


import PropTypes from 'prop-types';

import './Breadcrumb.less';
import { RightOutlined } from '@ant-design/icons';

const Breadcrumb = (props) => {
    const { separator, items, size } = props
    return (
        <BreadcrumbAnt
            separator={separator}
            items={items}
            className={`custom-breadcrumb-${size}`}
        />
    )
}

Breadcrumb.propTypes = {
    separator: PropTypes.element,
    items: PropTypes.array,
    size: PropTypes.oneOfType(['small', 'default', 'large'])
}

Breadcrumb.defaultProps = {
    separator : <RightOutlined />,
    items : [
        {
            title: <div>
                <span className="divider">|</span>
                Home 
            </div>,
        },
        {
            title: 'Application Center',
            href: '',
        },
        {
            title: 'Application List',
            href: '',
        },
        {
            title: 'An Application',
        }
    ],
    size: 'large'
}

export default Breadcrumb;