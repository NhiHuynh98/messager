import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { Button as ButtonAnt } from "antd";

import "./Button.less";

interface ButtonProps {
  type?: string;
  children?: ReactNode;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  ...rest
}) => {
  return (
    <ButtonAnt
      {...rest}
      type={type}
      className={`${className} custom-button ${type ? `custom-button-${type}` : ""}`}
    >
      {children}
    </ButtonAnt>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.element
};

Button.defaultProps = {
  type: "default",
  children: null
};

export default Button;
