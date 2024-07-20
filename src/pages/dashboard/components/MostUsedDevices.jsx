import React, { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, Cell, Tooltip, TriangleBar } from "recharts";

import REQUESTS from "../../../api/requests";

import numberChanging from "../../../utils/numberChange";

import styles from "../styles/devices.module.scss";

export default function MostUsedDevices() {
  const [usedDevices, setUsedDevices] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState("");

  function getUsedDevices() {
    function collBack(data) {
      const newData = Object.values(data);
      if (newData[0]) {
        setTotal(newData[0].total);
      }

      const dataArray = [];
      for (let key in data) {
        dataArray.push({ name: key, ...data[key] });
      }
      setUsedDevices(dataArray);
    }

    REQUESTS.STATISTICS.COUNT_USED_DEVICES(collBack);
  }

  useEffect(() => {
    getUsedDevices();
  }, []);

  useEffect(() => {
    if (usedDevices.length > 0) {
      const chartData = usedDevices.map((data) => {
        return {
          name: data.count,
          percent: parseFloat(data.percent).toFixed(0),
          os: data.name,
        };
      });
      setChartData(chartData);
    }
  }, [usedDevices]);

  return (
    <div className={styles["most-used-devices-statistics-section"]}>
      <div className={styles["most-used-devices-statistics"]}>
        <div className={styles["devices"]}>
          {usedDevices?.map((device) => (
            <div className={styles["single-device"]}>
              <div>
                <img src={device.icon} alt="" srcset="" width={40} />
              </div>
              <div className={styles["single-device__name-payment"]}>
                <span className={styles["single-device__name-payment__name"]}>
                  {device?.name[0].toUpperCase() + device?.name?.slice(1)}
                </span>
                <span
                  className={styles["single-device__name-payment__payment"]}
                >
                  Payment{" "}
                  {device &&
                    device.total_payment &&
                    device.total_payment.payment &&
                    numberChanging(device.total_payment.payment)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["chart"]}>
          <h1 className={styles["total-value"]}>Total : {total}</h1>
          <BarChart width={140} height={250} data={chartData}  >
            <XAxis dataKey="name" hide={true} />
            <Tooltip  cursor={{fill: 'transparent'}}/>
            <Bar dataKey="percent" barSize={20} shape="none">
              {chartData.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.os == "webos"
                        ? "#FBB142"
                        : entry.os == "tizen"
                        ? "#ED5B75"
                        : "#4FDFB1"
                    }
                  />
                );
              })}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
