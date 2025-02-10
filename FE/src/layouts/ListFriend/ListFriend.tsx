import React, { useState } from "react";
import PropTypes from "prop-types";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Badge, Layout, Menu, theme } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBell,
  faBagShopping,
  faArrowRightArrowLeft,
  faBars,
  faBox,
  faShield,
  faGear,
  faCircleExclamation,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../logo.png";
import "./ListFriend.less";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../helper/breadcrumb";
import ItemFriend from "./ItemFriend/ItemFriend";

const { Header, Sider, Content } = Layout;

const ListFriend = (props) => {
  const { children, separator, items, size } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const listFriend = [
    {
      id: 1,
      title: "Mr Pie",
      description: "Test demo",
      src: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    },
    {
      id: 2,
      title: "Mr Tom",
      description: "Test demo",
      src: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    },
    {
      id: 3,
      title: "Mr Jerry",
      description: "Test demo",
      src: "https://api.dicebear.com/7.x/miniavs/svg?seed=3"
    },
  ];

  const [activeId, setActiveId] = useState(-1);

  const handleItemClick = (id: number) => {
    setActiveId(id);
    console.log("id", id);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img width="150" height="52" src={Logo} alt="logo" />
          <hr />
        </div>
        {listFriend.map((item, index) => (
          <ItemFriend
            item={item}
            index={index}
            isActive={item.id === activeId}
            id={item.id}
            onClick={handleItemClick}
          />
        ))}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="header-menu">
            <Breadcrumbs />
            {/* <Breadcrumb
              separator={separator}
              items={items}
              className={`custom-breadcrumb-${size}`}
            /> */}

            <div className="header-icon">
              <div className="notification">
                <Badge count={"5"} color="#B98D58">
                  <FontAwesomeIcon icon={faBell} />
                </Badge>
              </div>

              <div className="language">
                <FontAwesomeIcon icon={faGlobe} />
                <span>EN</span>
              </div>
              <div className="avatar">
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "unset",
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

ListFriend.propTypes = {
  children: PropTypes.element,
};
ListFriend.defaultProps = {
  children: "",
};

export default ListFriend;
