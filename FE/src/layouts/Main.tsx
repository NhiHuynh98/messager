import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Breadcrumb, Button, Badge, Layout, Menu, theme } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faBell, faUser, faBagShopping, faBraille, faListUl, faArrowRightArrowLeft, faBars, faBox, faShield, faGear, faCircleExclamation, faCircleUser } from "@fortawesome/free-solid-svg-icons";

import Logo from "../logo.png";
import "./Main.less";
import { Link } from "react-router-dom";
import Breadcrumbs from "../helper/breadcrumb";

const { Header, Sider, Content } = Layout;

const Main = (props) => {
  const { children, separator, items, size } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img width="150" height="52" src={Logo} alt="logo" />
          <hr />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FontAwesomeIcon icon={faBars} />,
              label: <Link to="/dashboard">Dashboard</Link>
            },
            {
              key: "2",
              icon: <FontAwesomeIcon icon={faBagShopping} />,
              label: <Link to="/product-list">Product Listings</Link>
            },
            {
              key: "3",
              icon: <FontAwesomeIcon icon={faArrowRightArrowLeft} />,
              label: <Link to="/contract-bidding">Contract Bidding</Link>
            },
            {
              key: "4",
              icon:  <FontAwesomeIcon icon={faBox} />,
              label: <Link to="/order-management">Order Management</Link>
            },
            {
              key: "5",
              icon:<FontAwesomeIcon icon={faShield} />,
              label: <Link to="/KYC-Verification">KYC Verification</Link>
            },
            {
              key: "6",
              icon: <FontAwesomeIcon icon={faGear} />,
              label: <Link to="settings">Settings</Link>
            },
            {
              key: "7",
              icon: <FontAwesomeIcon icon={faBell} />,
              label: <Link to="/notifications">Notifications</Link>
            }
          ]}
        />

        <div className="bottom-sider">
          <hr />

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "8",
                icon: <FontAwesomeIcon icon={faCircleExclamation} />,
                label: "Terms & Conditions"
              },
              {
                key: "9",
                icon:  <FontAwesomeIcon icon={faCircleExclamation} />,
                label: "Privacy Policy"
              }
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            gap: 10,
            alignItems: "center"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64
            }}
          />

          <div className="header-menu">
            <Breadcrumbs/>
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
            borderRadius: borderRadiusLG
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

Main.propTypes = {
  children: PropTypes.element
};
Main.defaultProps = {
  children: ""
};

export default Main;
