import React from "react";
import PropTypes from "prop-types";

import { Alert as AlertAnt } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import './Alert.less';

const Alert = (props) => {
    const { message, description, type, showIcon, closable } = props
  return (
    <AlertAnt
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
      closable={closable}
    />
  );
};

Alert.propTypes = {
    message: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    showIcon: PropTypes.bool,
    closable: PropTypes.bool
};

Alert.defaultProps = {
    message: "Error",
    description: "This is an error message about copywriting.",
    type: "error",
    showIcon: true,
    closable: true
};

export default Alert;
