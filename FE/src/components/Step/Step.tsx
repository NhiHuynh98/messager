import React, { useState } from "react";
import PropTypes from "prop-types";

import { Steps as StepsAnt } from "antd";
import "./Step.less";

const Steps = (props) => {
  const { items, current, onChange } = props;

  return (
    <StepsAnt
      current={current}
      onChange={onChange}
      items={items}
      className="custom-step"
    />
  );
};

Steps.propTypes = {
  items: PropTypes.array,
  current: PropTypes.number,
  onChange: PropTypes.func
};

Steps.defaultProps = {
  items: [],
  current: 0,
  onChange: () => {}
};
export default Steps;
