import { SearchOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Date from "./DataPicher";

export default function (state) {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    setSearchText("");
  };
  const getColumnSearchProps = () => ({
    filterDropdown: ({}) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Date />
      </div>
    ),
    filterIcon: (filtered) => (
      <CalendarOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record, index) =>
      record[index].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  return getColumnSearchProps();
}
