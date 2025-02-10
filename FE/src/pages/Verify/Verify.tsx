import { Checkbox, Col, Flex, Radio, Row } from "antd";
import React from "react";
import Alert from "../../components/Alert/Alert";
import { Button, Step } from "../../components";

import "./Verify.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faArrowLeft,
  faCircleExclamation,
  faCircleQuestion,
  faExclamation,
  faFileArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Verify = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <Flex gap="middle" vertical className="verification">
      <Alert
        message="Reminder Notification !"
        description="You have not done the KYC process yet. Complete KYC to access bidding and product listings!"
      />

      <div className="verify-steps">
        <Step
          current={current}
          onChange={onChange}
          items={[
            {
              title: "Upload Documents"
            },
            {
              title: "Document Verification"
            },
            {
              title: "Confirmation"
            }
          ]}
        />
      </div>

      <div className="verify-title">Know Your Customer Details</div>
      {current === 0 && (
        <Flex vertical gap="middle" className="verify-body">
          <div className="title">Upload Document</div>
          <div className="sub-title">
            To ensure a smooth validation process, kindly upload the correct
            documents.
          </div>
          <div className="sub-title">
            Your submitted documents will remain confidential and will never be
            shared with other users.
          </div>
          <Row>
            <Col span={6}>
              <Flex vertical gap="middle">
                <Flex vertical gap="middle" style={{ marginTop: 30 }}>
                  <Flex
                    vertical
                    gap="small"
                    className="upload-document-content"
                  >
                    <div className="sub-title">Business License *</div>
                    <div className="sub-child-title">
                      Proof of registered <br /> business entity
                    </div>
                  </Flex>

                  <Flex
                    className="document-file-attach"
                    justify="center"
                    vertical
                    align="center"
                    style={{ width: 250, height: 279 }}
                    gap="middle"
                  >
                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      style={{ with: 56, height: 70, color: "#909090" }}
                    />
                    <Flex vertical style={{ marginTop: 50 }} gap="middle">
                      <div className="sub-title-disabled">Drag files here</div>
                      <Button>Browse</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col span={6}>
              <Flex vertical gap="middle">
                <Flex vertical gap="middle" style={{ marginTop: 30 }}>
                  <Flex
                    vertical
                    gap="small"
                    className="upload-document-content"
                  >
                    <div className="sub-title">Tax ID *</div>
                    <div className="sub-child-title">
                      Tax identification number <br /> or certificate.
                    </div>
                  </Flex>

                  <Flex
                    className="document-file-attach"
                    justify="center"
                    vertical
                    align="center"
                    style={{ width: 250, height: 279 }}
                    gap="middle"
                  >
                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      style={{ with: 56, height: 70, color: "#909090" }}
                    />
                    <Flex vertical style={{ marginTop: 50 }} gap="middle">
                      <div className="sub-title-disabled">Drag files here</div>
                      <Button>Browse</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col span={6}>
              <Flex vertical gap="middle">
                <Flex vertical gap="middle" style={{ marginTop: 30 }}>
                  <Flex
                    vertical
                    gap="small"
                    className="upload-document-content"
                  >
                    <div className="sub-title">Passport/ National ID *</div>
                    <div className="sub-child-title">
                      Scanned ID Proof for <br /> personal verification.
                    </div>
                  </Flex>

                  <Flex
                    className="document-file-attach"
                    justify="center"
                    vertical
                    align="center"
                    style={{ width: 250, height: 279 }}
                    gap="middle"
                  >
                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      style={{ with: 56, height: 70, color: "#909090" }}
                    />
                    <Flex vertical style={{ marginTop: 50 }} gap="middle">
                      <div className="sub-title-disabled">Drag files here</div>
                      <Button>Browse</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col span={6}>
              <Flex vertical gap="middle">
                <Flex vertical gap="middle" style={{ marginTop: 30 }}>
                  <Flex
                    vertical
                    gap="small"
                    className="upload-document-content"
                  >
                    <div className="sub-title">
                      Additional Documents (if needed) *
                    </div>
                    <div className="sub-child-title">
                      Company address proof or other <br /> relevant documents.
                    </div>
                  </Flex>

                  <Flex
                    className="document-file-attach"
                    justify="center"
                    vertical
                    align="center"
                    style={{ width: 250, height: 279 }}
                    gap="middle"
                  >
                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      style={{ with: 56, height: 70, color: "#909090" }}
                    />
                    <Flex vertical style={{ marginTop: 50 }} gap="middle">
                      <div className="sub-title-disabled">Drag files here</div>
                      <Button>Browse</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Col>
          </Row>

          <div className="file-format-accepted">
            File format accepted{" "}
            <span className="highlight">PNG, JPG, JPEG, PDF</span>. Max. file
            size <span className="highlight">3 MB.</span>
          </div>

          <Button type="action" className="btn-submit">
            SUBMIT
          </Button>
        </Flex>
      )}
      {current === 1 && (
        <Flex vertical gap="large" className="verify-body">
          <Flex gap="middle">
            <FontAwesomeIcon icon={faAngleLeft} />
            <div className="title">Document Verification</div>
          </Flex>

          <Flex className="content" gap="large" vertical>
            <Flex gap="middle" align="start">
              <Flex
                className="icon-exclamanation"
                align="center"
                justify="center"
              >
                <FontAwesomeIcon icon={faExclamation} />
              </Flex>
              <div className="sub-title">
                All data submitted during the KYC process, including business
                security licenses, tax IDs, passports, and other sensitive
                documents, is encrypted using industry-standard protocols. This
                ensures that no unauthorized parties can access or compromise
                the information.
              </div>
            </Flex>

            <Flex gap="middle" align="start">
              <Flex
                className="icon-exclamanation"
                align="center"
                justify="center"
              >
                <FontAwesomeIcon icon={faExclamation} />
              </Flex>
              <div className="sub-title">
                Additionally, you should be made aware that submitting these
                documents is a mandatory requirement for compliance. Verifying
                identities is crucial in protecting both Imiri Soma and the
                company's customers ensuring the safety of transactions.
              </div>
            </Flex>
          </Flex>

          <Flex className="condition-check" vertical gap="middle">
            <Flex gap="middle">
              <Checkbox />
              <div className="info-value">
                I hereby agree that the above document belongs to me and
                voluntarily give my consent to Imiri Soma to utilize it as my
                address proof for KYC on purpose only.
              </div>
            </Flex>

            <Flex gap="middle">
              <Checkbox />
              <div className="info-value">
                I give my consent to share my verification information with
                Imiri Soma. <span className="more">Read more...</span>
              </div>
            </Flex>
          </Flex>
          <Button type="action" className="btn-submit">
            CONTINUE
          </Button>
        </Flex>
      )}

      {current === 2 && (
        <Flex vertical gap="large" className="verify-body">
          <Flex gap="middle">
            <FontAwesomeIcon icon={faAngleLeft} />
            <div className="title">Confirm</div>
          </Flex>

          <Flex vertical gap="middle" align="center" justify="center" style={{ marginTop: 100, marginBottom: 100}}>
            <FontAwesomeIcon icon={faCircleCheck} style={{ width: 136, height: 136, color: '#00A060' }} />
            <div className="title">KYC verification request Completed</div>
            <Flex vertical gap="small" className="sub-title" style={{ textAlign: 'center'}}>
              <span>Thanks for submitting your document we’ll verify it and <br /></span>
              <span>complete your KYC as soon as possible.</span>
              <span className="more" style={{ fontStyle: 'Italic'}}>(Within 48 hours)</span>
            </Flex>
          </Flex>

          <Button className="btn-submit" type="action">BACK TO DASHBOARD</Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Verify;
