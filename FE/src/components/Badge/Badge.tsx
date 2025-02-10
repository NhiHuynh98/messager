import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Badge as BadgeAnt } from "antd";

import "./Badge.less";
const Badge = (props) => {
  const [text, setText] = useState();
  const [color, setColor] = useState();

  const { status } = props;

  useEffect(() => {
    switch (status) {
      case "success":
        setText("Accepted");
        setColor("green");
        break;
      case "pending":
        setText("Pending");
        setColor("#B98D58");
        break;
      case "warning":
        setText("Warning");
        setColor("orange");
        break;
      case "info":
        setText("Info");
        setColor("blue");
        break;
      case "delivery":
        setText("Delivered");
        setColor("#242E35");
        break;
      case "shipping":
        setText("Shipping");
        setColor("rgba(26, 46,53, 0.8)");
        break;
      case "in-progress":
        setText("In Progress");
        setColor("#B98D58");
        break;
      case "bid-accepted":
        setText("Bid Accepted");
        setColor("rgba(185, 141, 88, 0.8)");
        break;
      case "completed":
        setText("Completed");
        setColor("#00A060");
        break;
      default:
        setText("Approved");
        setColor("#00A060");
    }
  }, [status]);

  return (
    <BadgeAnt
      style={{ padding: "0px 24px" }}
      className="badge-custom"
      count={text}
      color={color}
    />
  );
};

Badge.propTypes = {
  status: PropTypes.string,
};

Badge.defaultProps = {
  status: "",
};

export default Badge;
