import React from "react";
import { Button, Flex, Select } from "antd";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { RightOutlined } from "@ant-design/icons";
import ProductCard from "../../../components/Card/ProductCard/ProductCard";
import { RCN } from "../../../assets/img";

import "./ProductDetail.less";
import Input from "../../../components/Input/Input";

const ProductDetail = () => {
  const navigate = useNavigate();

  const onChange = () => {
    console.log("change select");
  };
  const backToPage = () => {
    navigate(-1);
  };
  return (
    <div className="product-detail">
      <div className="product-header">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            {
              title: (
                <Flex align="center">
                  <FontAwesomeIcon icon={faArrowLeft} onClick={backToPage} />
                  <span className="divider">|</span>
                  Product Listings
                </Flex>
              )
            },
            {
              title: "Product Detail"
            }
          ]}
          className="custom-breadcrumb"
        />
      </div>
      <div className="product-body">
        <Flex gap="70px">
          <img className="product-image" alt="product image" src={RCN} />

          <Flex vertical gap="large">
            <Flex>
              <div className="product-type">
                <span className="rcn">RCNS</span>
                <span className="kernels">Kernels</span>
              </div>
            </Flex>

            <div className="product-name">Name Product</div>

            <Flex vertical className="product-info">
              <div className="title">Description: </div>
              <Flex className="content" style={{ maxWidth: "348px" }}>
                <div>Packaging</div>
                <div>Jute Bags</div>
              </Flex>
              <Flex className="content" style={{ maxWidth: "348px" }}>
                <div>Country Of Origin</div>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="label"
                  onChange={onChange}
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
                />
              </Flex>
              <div className="product-total">
                <div className="left">
                  <Flex className="content">
                    <div>Quantity Available</div>
                    <div className="btn-calculate">
                      <FontAwesomeIcon icon={faMinus} />
                      1000MT
                      <FontAwesomeIcon icon={faPlus} />
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
                </div>
                <Flex vertical className="right">
                  <span>Total price: $ 00</span>
                  <br />
                  <span>USD 000 / Metric Ton</span>
                </Flex>
              </div>
            </Flex>

            <Flex
              vertical
              className="product-info"
              style={{ maxWidth: "442px" }}
            >
              <div className="title">Quality Specifications: </div>
              <Flex justify="space-between" align="center">
                <div>Nut count</div>
                <Input placeholder="Fill in Here" />
              </Flex>
              <Flex justify="space-between" align="center">
                <div>Outturn</div>
                <Input placeholder="Minimum of 52 lbs per bag of 80 kg" />
              </Flex>
              <Flex justify="space-between" align="center">
                <div>Defective</div>
                <Input placeholder="Maximum of 8%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <div>Moisture</div>
                <Input placeholder="Maximum of 12%" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          className="product-action"
          gap="large"
          align="center"
          justify="center"
        >
          <Button>Save Changes</Button>
          <Button>Cancel</Button>
        </Flex>
      </div>
    </div>
  );
};

export default ProductDetail;
