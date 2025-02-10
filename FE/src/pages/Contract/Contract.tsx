import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Flex, Row } from "antd";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

import { Card, Tabs, Badge, Button, Confirm } from "../../components";

import "./Contract.less";

const Contract = () => {
  const navigate = useNavigate();

  const backPreviousPage = () => {
    navigate(-1);
  };

  const handleViewDetail = (type: string) => {
    navigate("/contract-bidding/detail", {
      state: {
        id: 1,
        name: "Sample Item",
        type: type
      }
    });
  };
  return (
    <Flex className="contract" vertical gap="middle">
      <div className="contract-header">
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
                  Available Contracts
                </Flex>
              )
            }
          ]}
          className="custom-breadcrumb"
        />
      </div>
      <div className="contract-body">
        <Tabs
          type="card"
          items={[
            {
              label: "Available Contracts",
              key: "1",
              children: (
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Card
                      title={
                        <Flex
                          align="start"
                          justify="space-between"
                          style={{ width: "100%" }}
                        >
                          <div>
                            <span className="title">Product Type: </span> <br />
                            <span>Raw Cashew Nuts - RCN 52lbs</span>
                          </div>
                          <Button onClick={() => handleViewDetail('view')}>
                            View Detail
                          </Button>
                        </Flex>
                      }
                    >
                      <Flex gap="middle" vertical>
                        <Flex align="center" justify="space-between">
                          <div className="info">
                            <span>Quantity Required:</span>
                            <br />
                            <span>1000 MT</span>
                          </div>

                          <div className="info">
                            <span>Remaining Quantity:</span>
                            <br />
                            <span>1000 MT</span>
                          </div>

                          <div className="info">
                            <span>Deadline:</span>
                            <br />
                            <span>Oct 31, 2024</span>
                          </div>
                        </Flex>

                        <Flex vertical>
                          <p className="title">Specifications Requirement:</p>

                          <Flex gap="small" vertical>
                            <Flex gap="70px" className="detail">
                              <div>Country of Origin</div>
                              <div>Indonesia</div>
                            </Flex>

                            <Flex gap="70px" className="detail">
                              <div>Outturn</div>
                              <div>52 lbs per 80kg bag</div>
                            </Flex>

                            <Flex gap="70px" className="detail">
                              <div>Defective</div>
                              <div>Maximum of 8%</div>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title={
                        <Flex
                          align="start"
                          justify="space-between"
                          style={{ width: "100%" }}
                        >
                          <div>
                            <span className="title">Product Type: </span> <br />
                            <span>Raw Cashew Nuts - RCN 52lbs</span>
                          </div>
                          <Button onClick={() => handleViewDetail('view')}>
                            View Detail
                          </Button>
                        </Flex>
                      }
                    >
                      <Flex gap="middle" vertical>
                        <Flex align="center" justify="space-between">
                          <div className="info">
                            <span>Quantity Required:</span>
                            <br />
                            <span>1000 MT</span>
                          </div>

                          <div className="info">
                            <span>Remaining Quantity:</span>
                            <br />
                            <span>1000 MT</span>
                          </div>

                          <div className="info">
                            <span>Deadline:</span>
                            <br />
                            <span>Oct 31, 2024</span>
                          </div>
                        </Flex>

                        <Flex vertical>
                          <p className="title">Specifications Requirement:</p>

                          <Flex gap="small" vertical>
                            <Flex gap="70px" className="detail">
                              <div>Country of Origin</div>
                              <div>Indonesia</div>
                            </Flex>

                            <Flex gap="70px" className="detail">
                              <div>Outturn</div>
                              <div>52 lbs per 80kg bag</div>
                            </Flex>

                            <Flex gap="70px" className="detail">
                              <div>Defective</div>
                              <div>Maximum of 8%</div>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  </Col>
                </Row>
              )
            },
            {
              label: "Bid History",
              key: "2",
              children: (
                <Flex>
                  <Card
                    style={{ width: "100%" }}
                    title={
                      <Flex vertical style={{ width: "100%" }} gap="large">
                        <Flex justify="space-between">
                          <div>Contract ID: #000000</div>
                          <Badge status="pending" />
                        </Flex>

                        <Flex align="center" justify="space-between">
                          <div className="info">
                            <span>Product Type:</span>
                            <br />
                            <span>Raw Cashew Nuts - RCN 52lbs</span>
                          </div>

                          <div className="info">
                            <span>Quantity Required:</span>
                            <br />
                            <span>1000 MT</span>
                          </div>

                          <div className="info">
                            <span>Deadline:</span>
                            <br />
                            <span>Oct 31, 2024</span>
                          </div>

                          <div className="info">
                            <span>Bid price per ton</span>
                            <br />
                            <span>2,0000 USD/MT</span>
                          </div>
                        </Flex>
                      </Flex>
                    }
                  >
                    <p className="title">Specifications Requirement:</p>

                    <Flex justify="space-between" horizontal>
                      <Flex vertical gap="small">
                        <Flex gap="70px" className="detail">
                          <div>Country of Origin</div>
                          <div>Indonesia</div>
                        </Flex>

                        <Flex gap="70px" className="detail">
                          <div>Outturn</div>
                          <div>52 lbs per 80kg bag</div>
                        </Flex>

                        <Flex gap="70px" className="detail">
                          <div>Defective</div>
                          <div>Maximum of 8%</div>
                        </Flex>
                      </Flex>

                      <Flex vertical gap="small">
                        <Button onClick={() => handleViewDetail('edit')} type="action">
                          Edit
                        </Button>
                        <Confirm>
                          <Button>Withdraw</Button>
                        </Confirm>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
              )
            }
          ]}
        />
      </div>
    </Flex>
  );
};

export default Contract;
