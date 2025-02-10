import React from "react";
import PropTypes from "prop-types";

import { UserOutlined } from "@ant-design/icons";
import { Flex, Avatar, Typography } from "antd";

import "./ItemFriend.less";

const ItemFriend = (props) => {
  const {
    item: { title, description, src },
    onClick,
    id,
    isActive,
  } = props;

  console.log("sss", id, isActive);
  return (
    <Flex
      horizontal
      gap="20px"
      className={`item-friend ${isActive ? "active" : ""}`}
      onClick={() => onClick(id)}
    >
      <Avatar size={35} src={src} />
      <Flex vertical justify="space-around">
        <Typography className="title">{title}</Typography>
        <Typography className="description">{description}</Typography>
      </Flex>
    </Flex>
  );
};

ItemFriend.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  id: PropTypes.number,
  isActive: PropTypes.bool
};
ItemFriend.defaultProps = {
    item: {
        title: "",
        description: ""
    },
    onClick: () => {},
    id: -1,
    isActive: false
};

export default ItemFriend;
