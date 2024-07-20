import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectTranslation } from "../../../features/Translation/TranslationSlice";
import TEXT from "../../../config/text";
import ICONS from "../../../config/icons";
import REQUESTS from "../../../api/requests";

import classes from "../styles/serverStatistics.module.scss";

export default function ServerStatistics () {
  const [server, setServer] = useState({});
  const [bull, setBull] = useState(false);

  const translation = useSelector(selectTranslation);

  const getServerStatistics = () => {
    REQUESTS.STATISTICS.SERVER_STATE(setServer);
  };

  useEffect(() => {
    setInterval(() => {
      setBull((current) => {
        const res = !current;

        return res;
      });
    }, 2000);
  }, []);

  useEffect(() => {
    getServerStatistics();
  }, [bull]);
  return (
      <div className={classes["server_statistics_div"]}>
        <div className={classes["server_statistics"]}>
          <span className={classes["server-txt"]}>
            {translation["Servers"] || TEXT["Servers"].toUpperCase()}
          </span>
          {ICONS.SERVER}
        </div>
        <div>
          <div className={classes["server_container"]}>
            <div
              style={{ background: "#ED5B75" }}
              className={classes["server-text-style"]}
            ></div>
            <p className={classes["server-txt"]}>
              {translation["Ram"] || TEXT["Ram"].toUpperCase()} :{" "}
              <span className={classes["server-txt_item"]}>{server?.ram || ""}</span>
            </p>
          </div>
          <div className={classes["server_container"]}>
            <div
              style={{ background: "#FBB142" }}
              className={classes["server-text-style"]}
            ></div>
            <p className={classes["server-txt"]}>

              {translation["Cpu"] || TEXT["Cpu"].toUpperCase()}
              {" "}

              : <span className={classes["server-txt_item"]}>{server?.cpu || ""}</span>
            </p>
          </div>
          <div className={classes["server_container"]}>
            <div
              style={{ background: "#4FDFB1" }}
              className={classes["server-text-style"]}
            ></div>
            <p className={classes["server-txt"]}>
              {translation["Uptime"] || TEXT["Uptime"].toUpperCase()} :{" "}
              <span className={classes["server-txt_item"]}>{server?.uptime || ""}</span>
            </p>
          </div>
          <div className={classes["server_container"]}>
            <div
              style={{ background: "#FBB142" }}
              className={classes["server-text-style"]}
            ></div>
            <p className={classes["server-txt"]}>
              {translation["Total"] || TEXT["Total"].toUpperCase()} :{" "}
              <span className={classes["server-txt_item"]}>{server?.disk?.total || ""}</span>
              {/* :{server.disk && server.disk.total} */}
            </p>
          </div>
          <div className={classes["server_container"]}>
            <div
              style={{ background: "#ED5B75" }}
              className={classes["server-text-style"]}
            ></div>
            <p className={classes["server-txt"]}>
              {translation["Total Used"] || TEXT["Total Used"].toUpperCase()} :{" "}
              <span className={classes["server-txt_item"]}>{server?.disk?.total_used || ""}</span>
            </p>
          </div>
        </div>
      </div>
  );
}
