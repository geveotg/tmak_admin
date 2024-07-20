import React, { useEffect, useState } from "react";

import { DatePicker, Select, Space, TimePicker } from "antd";

import { Line } from "@ant-design/plots";

import moment from "moment";

import REQUESTS from "../../../api/requests";
import classes from "../styles/dashboard.module.scss";

const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};

export default function OnlineUsersStatistics({ getAgain }) {
    const [data, setData] = useState([]);

    const [selectedDate, setSelectedDate] = useState(
        moment(new Date()).format("MM-DD-YY")
    );

    const [dateType, setDateType] = useState("year");

    const [platformType, setPlatformType] = useState("all");

    const config = {
        data,
        xField: dateType === "year" ? "month" : "day",
        yField: "count",
        seriesField: "name",
        legend: {
            position: "top",
        },
        smooth: true,
        animation: {
            appear: {
                animation: "path-in",
                duration: 5000,
            },
        },
    };

    const getOnlineUsers = () => {
        const query = {
            data_type: dateType,
            date: selectedDate,
            type: platformType,
        };

        REQUESTS.ONLINE_UESERS((data) => {
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
                // let _newData = newData.sort((a, b) => a.day - b.day)
                //  let  _newData = newData.map((obj) => { return { ...obj, count: parseInt(obj.count), day: obj.day.toString() } })

                setData(newData);
            }
        }, query);
    };

    useEffect(() => {
        getOnlineUsers();
    }, [selectedDate, dateType, platformType]);

    useEffect(() => {
        getOnlineUsers();
    }, [getAgain]);

    return (
        <div className={classes["online-statistics"]}>
            <div className={classes["title-date"]}>
                <span className={classes["online-statistics-title"]}>
                    ONLINE USERS
                </span>
                <Space>
                    <Select value={dateType} onChange={setDateType}>
                        <Option value="week">Week</Option>
                        <Option value="month">Month</Option>
                        <Option value="year">Year</Option>
                    </Select>
                    <PickerWithType
                        type={dateType}
                        onChange={(value) => {
                            if (!value) {
                                setSelectedDate(
                                    moment(new Date()).format("MM-DD-YY")
                                );
                            } else {
                                setSelectedDate(
                                    moment(value._d).format("MM-DD-YY")
                                );
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
