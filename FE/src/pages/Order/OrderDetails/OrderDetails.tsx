import React from "react";
import PropTypes from "prop-types";
import { Divider, Flex } from "antd";
import { Badge, Breadcrumb, Card } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faFile, faMessage } from "@fortawesome/free-regular-svg-icons";

import "./OrderDetails.less";
import OrderTrack from "../OrderTrack/OrderTrack";

const OrderDetails = () => {
  const navigate = useNavigate();

  const backPreviousPage = () => {
    navigate(-1);
  };

  const handleOpenChat = () => {
    navigate("/order-management/order-details/specific-chat", {
      state: {
        order_id: "#0001234"
      }
    });
  }

  return (
    <Flex vertical gap="middle" className="order-details">
      <div className="order-detail-header">
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
            },
            {
              title: "Order Details"
            }
          ]}
          className="custom-breadcrumb"
        />
      </div>

      <Flex className="order-detail-body" vertical gap="middle">
        <Flex justify="space-between">
          <Flex gap="middle" align="center">
            <div className="body-title">
              Order ID: <span className="order-id">#0001234</span>
            </div>
            <Badge status="bid-accepted" />
          </Flex>

          <Flex className="chat-box" gap="small" align="center" onClick={handleOpenChat}>
            <FontAwesomeIcon icon={faMessage} color="white" />
            <span>Chat</span>
          </Flex>
        </Flex>

        <Flex gap="large">
          {/* Order Details */}
          <Card title="Order Details">
            <Flex vertical gap="small">
              <Flex gap="middle">
                <div className="info-name">Product Type</div>
                <div className="info-value">RCNs</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Quantity Ordered</div>
                <div className="info-value">1000 MT</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Price per MT</div>
                <div className="info-value">$ 2,000/MT</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Total Order Value</div>
                <div className="info-value">$ 2,000,000</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Delivery Date/ETA</div>
                <div className="info-value">Nov 15, 2024</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Delivery Location</div>
                <div className="info-value">Cat Lai Port, Vietnam</div>
              </Flex>
            </Flex>
          </Card>
          {/* Quanlity Specification */}
          <Card title="Quanlity Specifications">
            <Flex vertical gap="small">
              <Flex gap="middle">
                <div className="info-name">Packaging</div>
                <div className="info-value">Jute Bags</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Country of Origin</div>
                <div className="info-value">Indonesia</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Nut Count</div>
                <div className="info-value">Max. 200 nuts/kg</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Outturn</div>
                <div className="info-value">Min. 52lbs/80kg bag</div>
              </Flex>

              <Flex gap="middle">
                <div className="info-name">Defective</div>
                <div className="info-value">Max. of 8%</div>
              </Flex>
              <Flex gap="middle">
                <div className="info-name">Moisture</div>
                <div className="info-value">Max. of 12%</div>
              </Flex>
            </Flex>
          </Card>
          {/* Order Document */}
          <Card title="Order Documents">
            <Flex vertical gap="small">
              <Flex
                justify="space-between"
                align="center"
                style={{ minWidth: "300px" }}
              >
                <Flex align="center" gap="small">
                  <FontAwesomeIcon icon={faFile} className="icon-file" />
                  <span className="info-value">Contract</span>
                </Flex>
                <FontAwesomeIcon icon={faDownload} className="icon-download" />
              </Flex>

              <Flex
                justify="space-between"
                align="center"
                style={{ minWidth: "300px" }}
              >
                <Flex align="center" gap="small">
                  <FontAwesomeIcon icon={faFile} className="icon-file" />
                  <span className="info-value">Shipping Documents</span>
                </Flex>
                <FontAwesomeIcon icon={faDownload} className="icon-download" />
              </Flex>

              <Flex
                justify="space-between"
                align="center"
                style={{ minWidth: "300px" }}
              >
                <Flex align="center" gap="small">
                  <FontAwesomeIcon icon={faFile} className="icon-file" />
                  <span className="info-value">Inspection Reports</span>
                </Flex>
                <FontAwesomeIcon icon={faDownload} className="icon-download" />
              </Flex>

              <Flex
                justify="space-between"
                align="center"
                style={{ minWidth: "300px" }}
              >
                <Flex align="center" gap="small">
                  <FontAwesomeIcon icon={faFile} className="icon-file" />
                  <span className="info-value">Invoices</span>
                </Flex>
                <FontAwesomeIcon icon={faDownload} className="icon-download" />
              </Flex>

              <Divider/>

               <Flex
                justify="space-between"
                align="center"
                style={{ minWidth: "300px" }}
              >
                <Flex align="center" gap="small">
                  <FontAwesomeIcon icon={faFile} className="icon-file" />
                  <span className="info-value">Additional Documents</span>
                </Flex>
                <FontAwesomeIcon icon={faUpload} className="icon-upload" />
              </Flex>
            </Flex>
          </Card>
        </Flex>

        <div className="detail-tracking">
            <OrderTrack/>
        </div>
      </Flex>
    </Flex>
  );
};

OrderDetails.defaultProps = {};

OrderDetails.propTypes = {};
export default OrderDetails;
