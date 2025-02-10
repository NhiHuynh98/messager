
import React from 'react';

import PropTypes from 'prop-types';

import { TaobaoCircleOutlined } from '@ant-design/icons';

import './NotificationCard.less';

const NotificationCard = (props) => {
    const { icon, title, subTitle } = props;

    return (
        <div className="noti-card">
            <div className="left-side">{icon}</div>
            <div className="right-side">
                <span>{title}</span>
                <span>{subTitle}</span>
            </div>
        </div>
    )
}

NotificationCard.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string,
    subTitle: PropTypes.string
}

NotificationCard.defaultProps = {
    icon:  <TaobaoCircleOutlined />,
    title: 'New contract opportunities.',
    subTitle: 'Lorem ipsum...'

}

export default NotificationCard