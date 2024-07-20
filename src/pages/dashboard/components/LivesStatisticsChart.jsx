import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { DatePicker } from "antd";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { selectwidgets } from "../../../features/widgets/selector";
import { selectTranslation } from "../../../features/Translation/TranslationSlice";

import REQUESTS from "../../../api/requests";
import TEXT from "../../../config/text";

import ICONS from "../../../config/icons";

import "../styles/chartStyle.scss";
import styles from "../styles/moviesStatisticsChart.module.scss";

export default function LivesStatisticsChart({ getAgain }) {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const translation = useSelector(selectTranslation);
  const widgets = useSelector(selectwidgets);

  const onChange = (date, dateString) => {
    setSelectedMonth(new Date(date._d).getMonth());
    setSelectedYear(new Date(date._d).getFullYear());
  };

  const getLives = () => {
    const query = { year: selectedYear, month: selectedMonth };

    function callback(data) {
      const newData = data.map((data) => ({
        name: data.name,
        viewed: data.viewed,
      }));

      setChartData(newData);
    }

    REQUESTS.LIVES_CHART(callback, query);
  };

  useEffect(() => {
    getLives();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
        getLives();
  }, [getAgain]);
  return (
    <>
      <div className="lives-ComposedChart">
        {widgets &&
          widgets.most_watched_statistics &&
          widgets.most_watched_statistics.enabled &&
          widgets.most_watched_statistics.enabled === "false" && (
            <div className="layer"></div>
          )}

        <div className={styles["lives-statistics-chart-section"]}>
          <div className={styles["lives-statistics-chart-section__top"]}>
            <span className={styles.title}>
              {TEXT["MOST VIEWED CHANNELS"]}
              <div>{ICONS.PRO}</div>
            </span>
            <DatePicker
              onChange={onChange}
              picker="month"
              placeholder="Select date"
            />
          </div>

          <ComposedChart
            layout="vertical"
            width={500}
            height={378}
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />

            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="viewed" barSize={20} fill="#f6b143" />
          </ComposedChart>
          <Link to="./lives-statistics" className={styles["view-more-link"]}>
            {translation["View more"] || TEXT["View more"]}
          </Link>
        </div>
      </div>
    </>
  );
}
