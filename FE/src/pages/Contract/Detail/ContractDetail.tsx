import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Col, Flex, Row, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import './ContractDetail.less';
import { Button } from "../../../components";

const ContractDetail = () => {
  const location = useLocation();
  const { id, name, type } = location.state || {};
  
  console.log("type", type);

  const navigate = useNavigate();

  const backPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Flex gap="middle" vertical className="contract-detail">
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
            },
            {
              title: "Contract Details"
            }
          ]}
          className="custom-breadcrumb"
        />
      </div>

      <Flex gap="70px" style={{ paddingLeft: '40px'}}>
        <div className="contract-title">
          Contract ID: <br />
          <span className="contract-id">#000001</span>
        </div>

        <Flex gap="20px" vertical className="contract-detail-info">
          <p className="title">Requirement Information:</p>

          <Flex>
            <div className="name">Bid Deadline</div>
            <div className="value">Oct 31 2024</div>
          </Flex>

          <Flex >
            <div className="name">Delivery Requirements</div>
            <div className="value">Delivery at Cat Lai Port</div>
          </Flex>
          <Flex >
            <div className="name">Country of Origin</div>
            <div className="value">Indonesia</div>
          </Flex>
          <Flex >
            <div className="name">Nut count</div>
            <div className="value">Maximum of 200 nuts per kg</div>
          </Flex>
          <Flex >
            <div className="name">Outturn</div>
            <div className="value">Minimum of 52 lbs per 80kg bag</div>
          </Flex>

           <Flex >
            <div className="name">Defective</div>
            <div className="value">Maximum of 8%</div>
          </Flex>

           <Flex >
            <div className="name">Moisture</div>
            <div className="value">Maximum of 12%</div>
          </Flex>

          <p className="title">Bidding:</p>

          <Flex  justify="space-between" className="content">
            <div>Product</div>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={[
                {
                  value: "vn",
                  label: "Viet Nam"
                },
                {
                  value: "usa",
                  label: "My"
                }
              ]}
              className="select-custom"
            />
          </Flex>

          <Flex className="content">
            <div>Quantity Required</div>
            <div className="btn-calculate">
              <FontAwesomeIcon icon={faMinus} />
              1000MT
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </Flex>


          <Flex className="content">
            <div>Remaining Quantity</div>
            <div className="btn-calculate">
              1000MT
            </div>
          </Flex>

          <Flex className="content">
            <div>Price per MT (USD)</div>
            <div className="btn-calculate">
              <FontAwesomeIcon icon={faMinus} />
              $2000
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </Flex>

              <Button style={{ width: "35% "}}type="action">PLACE BID</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContractDetail;
