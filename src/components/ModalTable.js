import React, { useState } from "react";
import Modal from "react-modal";
import "./ModalTable.css";
import { VscChromeClose } from "react-icons/vsc";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "70%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalTable = (props) => {

  const emptyData = {
    orderNo: "",
      date: "",
      customer: "",
      trackingNo: "",
      status: "",
      consignee: "",
  }
  const [shipmentData, setShipmentData] = useState(emptyData);

  function afterOpenModal(e) {
    props.onAfterOpen(e, 'After Modal Opened');
    setShipmentData(props.shipmentData);
  }

  function onModalClose(e) {
    let data = shipmentData;
    props.onCloseModal(e, data);
    setShipmentData(emptyData);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setShipmentData({
      ...shipmentData,
      [e.target.name]: value
    });
  };

  return (
    <div>
      <Modal
        isOpen={props.isModalOpen}
        onAfterOpen={e => afterOpenModal(e)}
        style={customStyles}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <VscChromeClose
          className="close-button"
          onClick={(e) => onModalClose(e)}
        >
          close
        </VscChromeClose>
        <h1>Shipment Details</h1>
        <div className="container">
          <div className="container-row">
            <label>Order No</label>
            <input
              type="text"
              name="orderNo"
              disabled={true}
              placeholder={shipmentData.orderNo}
            />
          </div>
          <div className="container-row">
            <label>Customer</label>
            <input
              type="text"
              name="customer"
              defaultValue={shipmentData.customer}
              onChange={handleChange}
            />
          </div>
          <div className="container-row">
            <label>Consignee</label>
            <input
              type="text"
              name="consignee"
              defaultValue={shipmentData.consignee}
              onChange={handleChange}
            />
          </div>
          <div className="container-row">
            <label>Date</label>
            <input
              type="text"
              name="date"
              defaultValue={shipmentData.date}
              onChange={handleChange}
            />
          </div>
          <div className="container-row">
            <label>Tracking No</label>
            <input
              type="text"
              name="trackingNo"
              defaultValue={shipmentData.trackingNo}
              onChange={handleChange}
            />
          </div>
          <div className="container-row">
            <label>Status</label>
            <input
              type="text"
              name="status"
              defaultValue={shipmentData.status}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalTable;