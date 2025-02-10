import React from "react";
import Alert from "../../components/Alert/Alert";
import { Typography, Flex, Divider } from "antd";

import "./Dashboard.less";
import Table from "../../components/Table/Table";
import NotificationCard from "../../components/Card/NotificationCard/NotificationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Flex gap="middle" vertical>
        <Alert
          message="Reminder Notification !"
          description="You have not done the KYC process yet. Complete KYC to access bidding and product listings!"
        />

        <div className="banner">
          <div className="banner-content">
            <Title level={3} style={{ margin: 0, fontWeight: 400 }}>
              Welcome to your Imiri Soma Dashboard,
            </Title>
            <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
              [User's Name].
            </Title>
          </div>
        </div>
      </Flex>

      <div className="sections">
        <Flex horizontal gap="large">
          <Flex vertical gap="middle" style={{ width: "60%" }}>
            <div className="border-card">
              <Table />
            </div>

            <Flex horizontal gap="middle">
              <div className="border-card" style={{ width: "50%" }}>
                <Table />
              </div>
              <div className="border-card" style={{ width: "50%" }}>
                <Table />
              </div>
            </Flex>
          </Flex>
          <Flex vertical gap="middle" style={{ width: "40%" }}>
            <div className="right-top">
              <div className="shortcut-item">
                <div className="icon">
                  <FontAwesomeIcon icon={faBagShopping} />
                </div>
                <span>Product Listings</span>
              </div>
              <div className="shortcut-item">
                <div className="icon">
                  <FontAwesomeIcon icon={faBagShopping} />
                </div>
                <span>Contract/Bidding</span>
              </div>
              <div className="shortcut-item">
                <div className="icon">
                  <FontAwesomeIcon icon={faBagShopping} />
                </div>
                <span>KYC Status</span>
              </div>
            </div>

            <div className="right-bottom">
              <span>Notification</span>
              <Divider style={{ margin: 0 }} />
              {[1, 2, 3, 4].map((item) => (
                <NotificationCard key={item} />
              ))}
            </div>
          </Flex>
        </Flex>

        {/* <div>sdsfsf</div> */}
      </div>
    </div>
  );
};

export default Dashboard;
