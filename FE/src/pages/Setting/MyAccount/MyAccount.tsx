import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex } from "antd";
import React from "react";
import { Button, Input } from "../../../components";

const MyAccount = () => {
  return (
    <Flex gap="large" vertical>
      <Flex
        className="info-box"
        align="center"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <Flex vertical gap="small">
          <div className="info-name">Profile Image</div>
          <div className="info-value">Upload your personal image.</div>
        </Flex>

        <Flex gap="large" align="center">
          <Avatar size={50} icon={<UserOutlined />} />

          <Button>Upload Image</Button>
        </Flex>
      </Flex>

      <Flex
        className="info-box"
        style={{ width: "100%" }}
        vertical
        gap="middle"
      >
        <div className="info-value">Account Information</div>

        <Flex gap="large" justify="space-between">
          <Flex gap="large">
            <Flex vertical gap="small">
              <div>
                <div className="sub-title">First Name</div>
                <div className="sub-title-disabled">An</div>
              </div>

              <div>
                <div className="sub-title">Email Address</div>
                <div className="sub-title-disabled">abc@gmail.com</div>
              </div>

              <div>
                <div className="sub-title">Country of residence</div>
                <div className="sub-title-disabled">Vietnam</div>
              </div>
            </Flex>
            <Flex vertical gap="small">
              <div>
                <div className="sub-title">Last name</div>
                <div className="sub-title-disabled">Nguyen</div>
              </div>
              <div>
                <div className="sub-title">Phone</div>
                <div className="sub-title-disabled">03423782374 </div>
              </div>
            </Flex>
          </Flex>

          <Flex gap="middle" vertical>
            <Button type="action">Save Changes</Button>
            <Button type="action">Cancel</Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex vertical gap="middle" className="info-box" style={{ width: "100%" }}>
        <div className="info-value">Password Change</div>

        <Flex gap="large" align="center" justify="space-between">
          <Flex gap="middle">
            <Flex vertical>
              <div className="info-name">Password</div>
              <Input placeholder={"Enter new password"} />
            </Flex>
            <Flex vertical>
              <div className="info-name">Confirm Password</div>
              <Input placeholder={"Enter confirm password"} />
            </Flex>
          </Flex>
          <Button type="action">Save Changes</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyAccount;
