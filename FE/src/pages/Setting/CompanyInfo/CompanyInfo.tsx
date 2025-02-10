import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex } from "antd";
import { Button, Input, TextArea } from "../../../components";

const CompanyInfo = () => {
  return (
    <Flex gap="large" vertical>
      <Flex
        className="info-box"
        align="center"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <Flex vertical gap="small">
          <div className="info-name">Company Logo</div>
          <div className="info-value">
            Upload your company logo. This will be the default image of your
            account.
          </div>
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
        <div className="info-value">Company Information</div>

        <Flex gap="large" justify="space-between">
          <Flex gap="large">
            <Flex vertical gap="small">
              <div>
                <div className="sub-title">Company Name</div>
                <div className="sub-title-disabled">ABC Company</div>
              </div>

              <div>
                <div className="sub-title">Business Registration Number</div>
                <Input placeholder="Enter business number" />
              </div>
            </Flex>
            <Flex vertical gap="small">
              <div>
                <div className="sub-title">Company Website</div>
                <Input value="http://abc.com" />
              </div>

              <div>
                <div className="sub-title">Office Phone Number</div>
                <Input placeholder="Enter office Phone Number"/>
              </div>
            </Flex>
          </Flex>

          <Flex gap="middle" vertical>
            <Button type="action">Save Changes</Button>
            <Button type="action">Cancel</Button>
          </Flex>
        </Flex>

        <div>
          <div className="sub-title">Office Address</div>
          <TextArea placeholder="Province the address of your main office" />
        </div>

        <div>
          <div className="sub-title">Company Description</div>
          <TextArea placeholder="Briefly describe your company" />
        </div>
      </Flex>
    </Flex>
  );
};

export default CompanyInfo;
