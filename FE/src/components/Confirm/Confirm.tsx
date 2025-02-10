import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";

import "./Confirm.less";

const Confirm = (props) => {
  const { handleOk, handleCancel, title, children } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const hdOk = () => {
    setIsModalOpen(false);
    handleOk();
  };
  const hdCancel = () => {
    setIsModalOpen(false);
    handleCancel();
  }

  return (
    <>
      {React.cloneElement(children, { onClick: handleOpen })}
      <Modal
        className="custom-modal"
        title={title}
        open={isModalOpen}
        onOk={hdOk}
        onCancel={hdCancel}
        footer={<Button>Submit</Button>}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

Confirm.propTypes = {
  isModalOpen: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element
};

Confirm.defaultProps = {
  isModalOpen: false,
  handleOk: () => {},
  handleCancel: () => {},
  title: "Confirmation",
  children: null
};

export default Confirm;
