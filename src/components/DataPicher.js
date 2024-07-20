import { DatePicker, Space } from "antd";
import React from "react";
const { RangePicker } = DatePicker;

const Date = () => (
  <Space direction="vertical" size={12}>
    <DatePicker renderExtraFooter={() => "extra footer"} />
  </Space>
);

export default Date;
