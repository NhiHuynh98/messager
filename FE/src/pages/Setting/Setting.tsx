import { UserOutlined } from "@ant-design/icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Flex } from "antd";
import React from "react";
import { Tabs } from "../../components";

import "./Setting.less";
import MyAccount from "./MyAccount/MyAccount";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import NotificationPreference from "./NotificationPreference/NotificationPreference";
import Document from "./Document/Document";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import Language from "./Language/Language";

const Setting = () => {
  return (
    <Flex gap="middle" className="setting">
      <Flex vertical gap="middle" style={{ width: "100%" }}>
        <div className="heading-title">Settings</div>
        <Flex className="basic-info" justify="space-between" align="center">
          <Flex justify="space-between" align="center" gap="150px">
            <Avatar size={65} icon={<UserOutlined />} />
            <Flex vertical gap="small">
              <div className="heading-sub-title">Name Account</div>
              <div className="info-value">Email: 00@gmail.com</div>
              <div className="info-value">Phone: 082424234</div>
            </Flex>
          </Flex>
          <Flex gap="small" className="info-value">
            Company verification status:{" "}
            <Flex gap="small" style={{ color: "#00A060" }}>
              <FontAwesomeIcon icon={faCircleCheck} />
              Verified
            </Flex>
          </Flex>
        </Flex>
        <div className="wrapper-tabs">
          <Tabs
            items={[
              {
                label: "My Account",
                key: 1,
                children: <MyAccount/>
              },
              {
                label: "Company Information",
                key: 2,
                children: <CompanyInfo/>
              },
              {
                label: "Notifications Preferences",
                key: 3,
                children: <NotificationPreference/>
              },
              {
                label: "Document Verification",
                key: 4,
                children: <Document/>
              },
              {
                label: "Payment Methods",
                key: 5,
                children: <PaymentMethod/>
              },
              {
                label: "Language and Region",
                key: 6,
                children: <Language/>
              }
            ]}
          ></Tabs>
        </div>
      </Flex>
    </Flex>
  );
};

export default Setting;
