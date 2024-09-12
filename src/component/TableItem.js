import React from "react";

const TableItem = ({ isClick }) => {
  return <tr className={isClick ? click : unClick}></tr>;
};

export default TableItem;
