import React, { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import ShipmentData from "../ShipmentData.json";
import "./Table.css";
import { TbListDetails } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import ModalTable from "./ModalTable";
import Logo from "../assets/kn-logo.png";

function Table() {
  const URL = 'enter_url_here'; // ommited not to commit personal URL

  const [tableData, setData] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    orderNo: "",
    date: "",
    customer: "",
    trackingNo: "",
    status: "",
    consignee: "",
  });

  /// Modal

  function openFromParent(orderNo) {
    const order = tableData.filter((item) => orderNo === item.orderNo);
    setModalData(order[0]);
    setIsOpen(true);
  }

  function handleAfterOpen(e, data) {
    console.log(e, data);
  }

  function handleCloseModal(e, data) {
    console.log(e, data);
    // put call to API, on success:
    const objIndex = tableData.findIndex((obj) => obj.orderNo == data.orderNo);
    tableData[objIndex] = data;
    setIsOpen(false);
  }

  //API data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(URL);
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error.message);
        setData(ShipmentData);
      }
    };

    fetchData();
  }, []);

  const deleteRow = (orderNo) => {
    // delete call to api here, on success:
    const del = tableData.filter((item) => orderNo !== item.orderNo);
    setData(del);
  };

  /// Table

  const tableHeader = () => {
    let headerElement = [
      "Order No",
      "Date",
      "Customer",
      "Tracking No",
      "Status",
      "Consignee",
      "Action",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  const tableBody = () => {
    return tableData.map(
      ({ orderNo, date, customer, trackingNo, status, consignee }) => {
        return (
          <tr key={orderNo}>
            <td>{orderNo}</td>
            <td>{date}</td>
            <td>{customer}</td>
            <td>{trackingNo}</td>
            <td>{status}</td>
            <td>{consignee}</td>
            <td className="actions">
              <TbListDetails
                className="button"
                title="Show Detailes"
                onClick={() => openFromParent(orderNo)}
              >
                Details
              </TbListDetails>
              <TiDelete
                className="button"
                title="Delete Row"
                onClick={() => deleteRow(orderNo)}
              >
                Delete
              </TiDelete>
            </td>
          </tr>
        );
      }
    );
  };

  return (
    <>
      <div className="header-logo">
        <a href="https://ee.kuehne-nagel.com/" target="_blank">
          <img src={Logo} />
        </a>
      </div>
      <table id="shipments">
        <thead>
          <tr>{tableHeader()}</tr>
        </thead>
        <tbody>{tableBody()}</tbody>
      </table>
      <ModalTable
        shipmentData={modalData}
        isModalOpen={modalIsOpen}
        onCloseModal={handleCloseModal}
        onAfterOpen={handleAfterOpen}
      />
    </>
  );
}

export default Table;
