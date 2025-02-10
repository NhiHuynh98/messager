import React from "react";
import { Badge, Breadcrumb, Button, Card, Tabs } from "../../components";
import { Flex } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const backPreviousPage = () => {
    navigate(-1);
  };

  const openViewDetail = () => {
    navigate("/order-management/order-details");
  }

  return (
    <Flex className="order-management" vertical gap="middle">
      <div className="order-header">
        <Breadcrumb
          items={[
            {
              title: (
                <Flex align="center">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={backPreviousPage}
                  />
                  <span className="divider">|</span>
                  Order Categories
                </Flex>
              )
            }
          ]}
          className="custom-breadcrumb"
        />
      </div>
      <div className="order-body">
        <Tabs
          type="card"
          items={[
            {
              label: "Active Orders",
              key: "1",
              children: <Flex>
                <Card title={
                    <Flex
                          align="start"
                          justify="space-between"
                          style={{ width: "100%" }}
                        >
                          <div>
                            <span className="title">Order ID: </span> <br />
                            <span>#0001234</span>
                          </div>
                          <Badge status="bid-accepted"/>
                        </Flex>
                }>
                    <Flex vertical gap="middle">
                        <p className="title">Order information</p>
                        <Flex gap="middle">
                            <div className="info-name">Product Type</div>
                            <div className="info-value">RCNs</div>
                        </Flex>
                        <Flex gap="middle">
                            <div className="info-name">Quantity Ordered</div>
                            <div className="info-value">1000 MT</div>
                        </Flex>
                        <Flex gap="middle">
                            <div className="info-name">Delivery Date/ETA</div>
                            <div className="info-value">Nov 15, 2024</div>
                        </Flex>
                     <Button type="action" onClick={openViewDetail}>View Details</Button>

                    </Flex>
                </Card>
              </Flex>
            },
            {
              label: "Completed Orders",
              key: "2",
              children: <Flex>
                <Card title={
                    <Flex
                          align="start"
                          justify="space-between"
                          style={{ width: "100%" }}
                        >
                          <div>
                            <span className="title">Order ID: </span> <br />
                            <span>#0001234</span>
                          </div>
                          <Badge status="completed"/>
                        </Flex>
                }>
                    <Flex vertical gap="middle">
                        <p className="title">Order information</p>
                        <Flex gap="middle">
                            <div className="info-name">Product Type</div>
                            <div className="info-value">RCNs</div>
                        </Flex>
                        <Flex gap="middle">
                            <div className="info-name">Quantity Ordered</div>
                            <div className="info-value">1000 MT</div>
                        </Flex>
                        <Flex gap="middle">
                            <div className="info-name">Delivery Date/ETA</div>
                            <div className="info-value">Nov 15, 2024</div>
                        </Flex>

                        <Button type="action" onClick={openViewDetail}>View Details</Button>
                    </Flex>
                </Card>
              </Flex>
            }
          ]}
        />
      </div>
    </Flex>
  );
};

export default Order;
