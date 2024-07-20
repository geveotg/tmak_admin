import React, { useState, useEffect } from "react";

import { DatePicker, Select, Space, TimePicker } from "antd";
import moment from "moment";
import { Line } from "@ant-design/plots";
import REQUESTS from "../../../api/requests";

import classes from "../styles/dashboard.module.scss";

const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};

const COLOR_PLATE_10 = [
    "#5B8FF9",
    "#5AD8A6",
    "#5D7092",
    "#F6BD16",
    "#E8684A",
    "#6DC8EC",
    "#9270CA",
    "#FF9D4D",
    "#269A99",
    "#FF99C3",
];

export default function PaymentStatistics({ getAgain }) {
    const [data, setData] = useState([]);

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("MM-DD-YY"));

    const [dateType, setDateType] = useState("year");

    const [platformType, setPlatformType] = useState("all");

    const config = {
        data,
        xField: dateType === "year" ? "month" : "day",
        yField: "count",
        seriesField: "name",
        color: COLOR_PLATE_10,
        point: {
            shape: ({ category }) => {
                return category === "Gas fuel" ? "square" : "circle";
            },
            style: ({ year }) => {
                return {
                    r: Number(year) % 4 ? 0 : 3,
                };
            },
        },
    };

    const getChart = () => {
        const query = {
            data_type: dateType,
            date: selectedDate,
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

        REQUESTS.STATISTICS.CART_PAYMENTS(collback, (err) => {}, query);
    };

    useEffect(() => {
        getChart();
    }, [getAgain]);

    useEffect(() => {
        getChart();
    }, [selectedDate, dateType, platformType]);

    return (
        <div className={classes["payment-statistics-chart"]}>
            <div className={classes["payment-chart-date"]}>
                <span className={classes["payment-chart-container-title"]}>PAYMENT</span>
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
            <Line {...config} style={{ height: 350 }} />
        </div>
    );
}
