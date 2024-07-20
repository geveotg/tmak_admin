import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Table, Image, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { selectappInfo } from "../../../features/appInfoSlice/AppInfoSlice";

import TEXT from "../../../config/text";
import REQUESTS from "../../../api/requests";

export default function ViewMoreSeriesStatistics() {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(["id", "DESC"]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0)

  const [search, setSearch] = useState({});

  const appInfo = useSelector(selectappInfo);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
      return (
        <Input
          allowClear
          autoFocus
          placeholder="Type text here"
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
        />
      );
    },
    filterIcon: () => {
      return (
        <>
          <SearchOutlined />
        </>
      );
    },
  })

  const columns = [
    {
      title: TEXT["Banner"],
      dataIndex: "icon",
      key: "icon",
      align: "center",
      render: (text, record, index) => {
        return (
          <Image
            width={40}
            src={text}
            onError={({ currentTarget }) => {
              if (appInfo && appInfo.logo) {
                currentTarget.src = appInfo.logo;
              }
            }}
          />
        );
      },
    },
    {
      title: TEXT["Name"],
      dataIndex: "name",
      key: "name",
      align: "center",
      ...getColumnSearchProps(),
    },
    {
      title: TEXT["Release date"],
      dataIndex: "year",
      key: "year",
      align: "center",
      sorter: true,
      render: (record) => {
        if (record) {
          const dateObj = new Date(record);
          let year = dateObj.getFullYear();
          let day = dateObj.getDate();
          let month = dateObj.getMonth();

          year = year < 10 ? "0" + year : year;
          day = day < 10 ? "0" + day : day;
          month = month < 10 ? "0" + month : month;

          return `${day}/${month}/${year}`;
        } else {
          return "-"
        }
      },
    },

    {
      title: TEXT["Viewed"],
      dataIndex: "viewed",
      key: "viewed",
      align: "center",
      sorter: true,
    },
  ];

  const getMoviesStatistics = () => {
    setLoading(true);
    const query = {
      sort: JSON.stringify(sort),
      filter: JSON.stringify({
        type: "series",
      }),
      limit,
      page: currentPage,
      pagination: 1,
    };

    if (search.name) {
      if (!query.search) {
        query.search = {};
      }
      query.search["name"] = search.name[0];
      query.search = JSON.stringify(query.search);

    }

    REQUESTS.GET_MOVIES(
      (data) => {
        setLoading(false);
        setTableData(data.rows);
        setTotal(data.count)
        setLimit(data.limit)
        setCurrentPage(data.currentPage)
      },
      (err) => {
        setLoading(false);
      },
      query
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.field) {
      setSort([sorter.field, sorter.order === "ascend" ? "ASC" : "DESC"]);
    }
    setSearch(filters);

  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMoviesStatistics();
    }, 100);
    return () => clearTimeout(timeout);

  }, [sort, currentPage, limit, search]);
  return (
    <div>
      <h3>MOST VIEWED SERIES</h3>

      <Table
        bordered
        size={"small"}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          x: "max-content",
        }}
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: limit,
          showSizeChanger: true,
          total,
        }}
      />
    </div>
  );
}
