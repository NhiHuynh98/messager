import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Switch } from "antd";
import { Button, Input } from "../../../components";

import "./Notification.less";

const NotificationPreference = () => {
  return (
    <Flex gap="large" vertical className="noti-preference">
      <Flex
        className="info-box"
        align="center"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <Flex vertical gap="small">
          <div className="info-name">Notification Preferences</div>
          <div className="info-value">
            Allow displaying notifications in the platform
          </div>
        </Flex>

        <Flex gap="large" align="center">
          <Button type="action">Save Changes</Button>
          <Button type="action">Cancel</Button>
        </Flex>
      </Flex>

      <Flex
        className="info-box"
        style={{ width: "100%" }}
        vertical
        gap="middle"
      >
        <div className="info-value">Allow notification of items</div>

        <Flex gap="middle" justify="space-between" vertical>

            <Flex align="center" justify="space-between" className="notification-items" style={{ width: "100%"}}>
                <Flex vertical gap="small">
                    <div className="info-value">Bidding Opportunities</div>
                    <div className="info-name">Toggle to enable/disable notifications for new contract opportunities.</div>
                </Flex>

                <Switch/>
            </Flex>

            <Flex align="center" justify="space-between" className="notification-items" style={{ width: "100%"}}>
                <Flex vertical gap="small">
                    <div className="info-value">Bidding Opportunities</div>
                    <div className="info-name">Toggle to enable/disable notifications for new contract opportunities.</div>
                </Flex>

                <Switch/>
            </Flex>

            <Flex align="center" justify="space-between" className="notification-items" style={{ width: "100%"}}>
                <Flex vertical gap="small">
                    <div className="info-value">Bidding Opportunities</div>
                    <div className="info-name">Toggle to enable/disable notifications for new contract opportunities.</div>
                </Flex>

                <Switch/>
            </Flex>

            <Flex align="center" justify="space-between" className="notification-items" style={{ width: "100%"}}>
                <Flex vertical gap="small">
                    <div className="info-value">Bidding Opportunities</div>
                    <div className="info-name">Toggle to enable/disable notifications for new contract opportunities.</div>
                </Flex>

                <Switch/>
            </Flex>
        </Flex>
          
      </Flex>
    </Flex>
  );
};

export default NotificationPreference;
