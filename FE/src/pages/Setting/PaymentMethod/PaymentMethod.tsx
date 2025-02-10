import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "antd";
import React from "react";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons/faGlobeAmericas";

import "./PaymentMethod.less";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";

const PaymentMethod = () => {
  return (
    <Flex gap="large" vertical className="payment-method">
      <Flex
        className="info-box"
        align="center"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <Flex vertical gap="small">
          <div className="block-title">Payment Information</div>
          <div className="block-sub-title">
          Securely stores users' payment and banking information for more convenient transactions.
          </div>
        </Flex>
        
      </Flex>

      <Flex
        className="info-box"
        style={{ width: "100%" }}
        vertical
        gap="small"
      >
        <div className="block-title">Choose Payment Method</div>
        <div className="block-sub-title">Securely stores users' payment and banking information for more convenient transactions.</div>

        <Flex gap="large" align="center" justify="center">
          <Flex align="center" justify="center" gap="small" className="bank-method">
            <FontAwesomeIcon icon={faGlobeAmericas} size="2xl"/>
            <div className="block-title-disabled">Bank Account</div>
          </Flex>

          <Flex vertical align="center" justify="center" gap="small" className="add-method">
            <FontAwesomeIcon icon={faCirclePlus} size="xl"/>
            <div className="block-title-disabled">Add Payment Method</div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PaymentMethod;
