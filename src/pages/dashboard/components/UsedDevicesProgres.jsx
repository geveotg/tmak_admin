import React, { useEffect, useState } from "react";
import moment from "moment";
import { Area } from "@ant-design/plots";
import { DatePicker, Select, Space, TimePicker } from "antd";

import REQUESTS from "../../../api/requests";

import styles from "../styles/mostUsedDevices.module.scss";

import "../styles/chartStyle.scss";

const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};

const UsedDevicesProgres = ({ getAgain }) => {
    const [data, setData] = useState([]);

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("MM-DD-YY"));

    const [dateType, setDateType] = useState("year");

    const [platformType, setPlatformType] = useState("all");

    const config = {
        data,
        xField: dateType === "year" ? "month" : "day",
        yField: "count",
        seriesField: "name",
        slider: {
            start: 0.1,
            end: 0.9,
        },
    };

    const getChart = () => {
        const query = {
            data_type: dateType,
            date: selectedDate || new Date().getFullYear(),
            type: platformType,
        };

        function collback(data) {
            if (Array.isArray(data)) {
                data = data.map((obj) => {
                    return { ...obj, count: parseInt(obj.count) };
                });

                setData(data);
            } else {
                const clone = { ...data };

                const newData = [];

                for (let platform in clone) {
                    for (let value of clone[platform]) {
                        if (dateType === "month" || dateType === "week") {
                            newData.push({
                                name: platform,
                                count: parseInt(value.count),
                                day: value.day.toString(),
                            });
                        } else {
                            newData.push({
                                name: platform,
                                count: parseInt(value.count),
                                month: value.month,
                            });
                        }
                    }
                }
                setData(newData);
            }
        }

        function errorCollback(data) {}

        REQUESTS.STATISTICS.DEVICE_CHART(collback, errorCollback, query);
    };

    useEffect(() => {
        getChart();
    }, [selectedDate, dateType, platformType]);

    useEffect(() => {
        getChart();
    }, [getAgain]);

    return (
        <div className="most-used-devices-BarChart">
            <div className={styles["most-used-devices-chart-container"]}>
                <div className={styles["title-datepicker-container"]}>
                    <span className={styles["title"]}>DEVICE</span>
                    <Space>
                        <Select value={dateType} onChange={setDateType}>
                            <Select.Option value="week">Week</Select.Option>
                            <Select.Option value="month">Month</Select.Option>
                            <Select.Option value="year">Year</Select.Option>
                        </Select>
                        <PickerWithType
                            type={dateType}
                            onChange={(value) => {
                                if (!value) {
                                    setSelectedDate(moment(new Date()).format("MM-DD-YY"));
                                } else {
                                    setSelectedDate(moment(value._d).format("MM-DD-YY"));
                                }
                            }}
                        />
                        <Select
                            style={{
                                width: 120,
                            }}
                            // placeholder={platformType === "all" ? "All" : "Platform"}
                            defaultValue={platformType}
                            onChange={setPlatformType}
                            options={[
                                {
                                    value: "platform",
                                    label: "Platform",
                                },
                                {
                                    value: "all",
                                    label: "All",
                                },
                            ]}
                        />
                    </Space>
                </div>
                <Area {...config} style={{ height: 350 }} />
            </div>
        </div>
    );
};

export default UsedDevicesProgres;
