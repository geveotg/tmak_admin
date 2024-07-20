import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { DatePicker } from "antd";

import { selectwidgets } from "../../../features/widgets/selector";
import { selectTranslation } from "../../../features/Translation/TranslationSlice";
import REQUESTS from "../../../api/requests";
import TEXT from "../../../config/text";

import styles from "../styles/moviesStatisticsChart.module.scss";
import ICONS from "../../../config/icons";

export default function SeriesStatisticsChart({getAgain}) {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const widgets = useSelector(selectwidgets);

  const translation = useSelector(selectTranslation);

  const onChange = (date, dateString) => {
    setSelectedMonth(new Date(date._d).getMonth());
    setSelectedYear(new Date(date._d).getFullYear());
  };

  const getMovies = () => {
    const query = { year: selectedYear, month: selectedMonth, type: "series" };

    function callback(data) {
      const newData = data.map((data) => ({
        name: data.name,
        viewed: data.viewed,
      }));

      setChartData(newData);
    }

    REQUESTS.MOVIES_CHART(callback, query);
  };

  useEffect(() => {
    getMovies();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
        getMovies();
  }, [getAgain]);

  return (
    <div className="series-ComposedChart">
           {widgets &&
          widgets.most_watched_statistics &&
          widgets.most_watched_statistics.enabled &&
          widgets.most_watched_statistics.enabled === "false" && (
            <div className="layer"></div>
          )}
      <div className={styles["movies-statistics-chart-section"]}>
        <div className={styles["movies-statistics-chart-section__top"]}>
          <h3 className={styles.title}>{TEXT["MOST VIEWED SERIES"]}<div>{ICONS.PRO}</div></h3>
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
          <Bar dataKey="viewed" barSize={20} fill="#ED5B75" />
        </ComposedChart>
        <Link to="./serias-statistics" className={styles["view-more-link"]}>
          {translation["View more"] || TEXT["View more"]}
        </Link>
      </div>
    </div>
  );
}
