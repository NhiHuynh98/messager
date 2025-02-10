import { Divider, Flex, Timeline } from "antd";
import React from "react";
import { Step } from "../../../components";

import "./OrderTrack.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleDot } from "@fortawesome/free-solid-svg-icons";

const OrderTrack = () => {
  return (
    <Flex vertical gap="middle">
      <div className="title">Detail Tracking</div>
      <div className="sub-title">
        Below are the detailed steps for tracking in-progress orders
      </div>

      <Flex gap="large" style={{ margin: "30px 0px 0px 0px" }}>
        <Step
          items={[
            {
              title: "Order Placed"
            },
            {
              title: "In Transit"
            },
            {
              title: "Customs Clearance"
            },
            {
              title: "Delivered"
            },
            {
              title: "Completed"
            }
          ]}
        />
      </Flex>

      <Divider />

      <Flex vertical gap="large" style={{ marginLeft: 50 }}>
        <Flex gap="middle" align="center">
          <div className="step-box">Step 1</div>
          <div className="title">Order Placed</div>
        </Flex>
        <Timeline
          style={{ marginLeft: "40px" }}
          items={[
            {
              dot: <FontAwesomeIcon icon={faCircleCheck} />,
              children: "Create a services site 2015-09-01"
            },
            {
              dot: <FontAwesomeIcon icon={faCircleCheck} />,
              children: "Solve initial network problems 2015-09-01"
            },
            {
              dot: <FontAwesomeIcon icon={faCircleDot} />,
              children: "Technical testing 2015-09-01"
            },
            {
              dot: <FontAwesomeIcon icon={faCircleDot} />,
              children: "Network problems being solved 2015-09-01"
            }
          ]}
        />
        <Flex gap="middle" align="center">
          <div className="step-box">Step 2</div>
          <div className="title">In Transit</div>
        </Flex>

        <Timeline
          style={{ marginLeft: "40px" }}
          items={[
            {
              dot: <FontAwesomeIcon icon={faCircleDot} />,
              children: "Create a services site 2015-09-01"
            },
            {
              dot: <FontAwesomeIcon icon={faCircleDot} />,
              children: "Solve initial network problems 2015-09-01"
            },
            {
              dot: <FontAwesomeIcon icon={faCircleDot} />,
              children: "Technical testing 2015-09-01"
            },
            {
              dot: <FontAwesomeIcon icon={faCircleDot} />,
              children: "Network problems being solved 2015-09-01"
            }
          ]}
        />

        <Flex gap="middle" align="center">
          <div className="step-box step-box-disabled">Step 3</div>
          <div className="title-disabled">Completed</div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrderTrack;
