import React from "react";
import { Badge } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { Flex } from "antd";

import "./Document.less";

const Document = () => {
  return (
    <Flex gap="large" vertical className="document-verify">
      <Flex
        className="info-box"
        align="center"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <Flex vertical gap="small">
          <div className="block-title">Company Verification</div>
          <div className="block-sub-title">
            Built for trust, our full services are exclusively available to
            verified businesses.{" "}
          </div>
        </Flex>

        <Flex gap="small" style={{ color: "#00A060" }} align="center">
          <FontAwesomeIcon icon={faCircleCheck} />
          Verified
        </Flex>
      </Flex>

      <Flex
        className="info-box"
        style={{ width: "100%" }}
        vertical
        gap="middle"
      >
        <div className="block-title">Document Verification</div>
        <div className="block-sub-title">Allow Email Notifications</div>

        <Flex gap="middle" justify="space-between" vertical>
          <Flex
            align="center"
            justify="space-between"
            className="document-items"
            style={{ width: "100%" }}
          >
            <Flex vertical gap="small">
              <div className="block-title">Business documents</div>
              <div className="sub-title-disabled">
                Verifying your company can help your business come across as
                trustworthy and give partners confidence that your company will
                deliver high-quality product offerings.
              </div>
            </Flex>

            <Badge status="Approved" />
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            className="document-items"
            style={{ width: "100%" }}
          >
            <Flex vertical gap="small">
              <div className="block-title">
                Business registration certificate
              </div>
            </Flex>

            <Badge status="Approved" />
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            className="document-items"
            style={{ width: "100%" }}
          >
            <Flex vertical gap="small">
              <div className="block-title">Tax identification numbers</div>
            </Flex>

            <Badge status="Approved" />
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            className="document-items"
            style={{ width: "100%" }}
          >
            <Flex vertical gap="small">
              <div className="block-title">Passport/ Identity card</div>
            </Flex>

            <Badge status="Approved" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Document;
