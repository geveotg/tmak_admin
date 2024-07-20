import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectwidgets } from "../../../features/widgets/selector";
import CardContainer from "./CardContainer";
import "../styles/cardStyle.scss";
import REQUESTS from "../../../api/requests";
import ICONS from "../../../config/icons";

export default function DashboardCards({ getAgain }) {
  const [devices, setDevices] = useState({});
  const [resellers, setResellers] = useState([]);
  const [resellersActivations, setResellersActivations] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [devicePayment, setDevicePayment] = useState({});
  const [currency, setCurrency] = useState(null);

  const widgets = useSelector(selectwidgets);

  const getPlaylistsInfo = () => {
    REQUESTS.STATISTICS.TOTALS(setPlaylists);
  };

  const getPlatforms = () => {
    REQUESTS.STATISTICS.COUNT_USED_DEVICES((data) => {
      const newData = Object.entries(data).map(([name, platform]) => ({
        name,
        ...platform,
      }));

      setPlatforms(newData);
    });
  };

  const getTotalDevices = () => {
    REQUESTS.TOTAL_DEVICES((data) => {
      setDevices(data);
    });
  };

  const getRegisteredResellers = () => {
    REQUESTS.RESELLERS_REGISTERED((data) => {
      setResellers(data);
    });
  };

  const getResellersActivations = () => {
    REQUESTS.RESELLERS_ACTIVATION((data) => {
      setResellersActivations(data);
    });
  };

  const getDevicePayment = () => {
    REQUESTS.DEVICE_PAYMENT(setDevicePayment);
  };

  const getPaymentSettings = () => {
    REQUESTS.PAYMENT_SETTINGS((data) => {
      setCurrency(data.currency);
    });
  };

  useEffect(() => {
    getTotalDevices();
    getPlatforms();
    getPlaylistsInfo();
    getRegisteredResellers();
    getResellersActivations();
    getDevicePayment();
    getPaymentSettings();
  }, []);

  useEffect(() => {
    getTotalDevices();
    getPlatforms();
    getPlaylistsInfo();
    getRegisteredResellers();
    getResellersActivations();
    getDevicePayment();
    getPaymentSettings();

  }, [getAgain]);

  return (
    <div className="dashboard-information-cards-container">
      <CardContainer
        title={"Platforms"}
        icon={ICONS.PLATFORMS}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
        iconColor={"rgb(237, 91, 117)"}
      >
        <div className="dashboardCard__platforms">
          {platforms.map((platform) => {
            return (
              <div>
                <strong>
                  {platform &&
                    platform.name &&
                    platform.name[0].toUpperCase() + platform.name.substring(1)}
                  :
                </strong>

                <span className="dashboardCard__values"> {platform.count}</span>
              </div>
            );
          })}
        </div>
      </CardContainer>
      <CardContainer
        title={"Devices"}
        icon={ICONS.DEVICES}
        iconColor={"#219ebc"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
      >
        <div className="dashboardCard__devices">
          <div>
            <div>
              <strong>Total: </strong>{" "}
              <span className="dashboardCard__values">{devices.total_ds}</span>
            </div>
            <div>
              <strong>Free trial: </strong>{" "}
              <span className="dashboardCard__values">
                {devices.total_trial}
              </span>
            </div>
          </div>
          <div>
            <div>
              <strong>Paid: </strong>{" "}
              <span className="dashboardCard__values">
                {devices.total_paid}
              </span>
            </div>
            <div>
              <strong>Online: </strong>{" "}
              <span className="dashboardCard__values">
                {devices.total_online}
              </span>
            </div>
          </div>
        </div>
      </CardContainer>

      <CardContainer
        title={"Payments done"}
        icon={ICONS.PAYMENT_DONE}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
        iconColor={"#588157"}
      >
        <div >
          <div className="payment-done-wrapper">
            <div >
              <strong>Today: </strong>{" "}
              <span className="dashboardCard__values">
                {devicePayment &&
                  devicePayment.total &&
                  parseFloat(devicePayment.today).toFixed(2)}{" "}
                <span className="currency-style">{currency}</span>
              </span>
            </div>
            <div >
              <strong>Total: </strong>{" "}
              <span className="dashboardCard__values">
                {devicePayment &&
                  devicePayment.total ? <>{parseFloat(devicePayment.total).toFixed(2)}
                  <span className="currency-style">{currency}</span>
                </>
                  : 0}
              </span>
            </div>
          </div>

          {
            devicePayment && devicePayment.total_with_status &&
            <div className="payment-done-wrapper">
              <div><strong>Pending:</strong> <span className="dashboardCard__values">{devicePayment.total_with_status.PENDING ?
                `${parseFloat(devicePayment.total_with_status.PENDING).toFixed(2)} ${currency}` : 0}</span>
              </div>
              <div><strong>Completed:</strong> <span className="dashboardCard__values">{devicePayment.total_with_status.COMPLETED ? <>
                {parseFloat(devicePayment.total_with_status.COMPLETED).toFixed(2)}
                <span className="currency-style">{currency}</span>
              </>
                : 0}</span>
              </div>
            </div>
          }
        </div>
      </CardContainer>

      <CardContainer
        title={"Playlists added"}
        icon={ICONS.PLAYLISTS}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
        iconColor={"#6394f7"}
      >
        <div className="dashboardCard__">
          <div>
            <strong>Total: </strong>{" "}
            <span className="dashboardCard__values">
              {playlists.total_playlists}
            </span>
          </div>
          <div>
            <strong>Today: </strong>{" "}
            <span className="dashboardCard__values">
              {playlists.today_playlists}
            </span>
          </div>
        </div>
      </CardContainer>
      {widgets &&
        widgets.reseller &&
        widgets.reseller.enabled &&
        widgets.reseller.enabled === "true" && (
          <CardContainer
            title={"Resellers registered"}
            icon={ICONS.RESELLER_REGISTERED}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
            iconColor={"#ffbe0b"}
          >
            <div className="dashboardCard__">
              <div>
                <strong>Total: </strong>{" "}
                <span className="dashboardCard__values">
                  {resellers.reselleres}
                </span>
              </div>
              <div>
                <strong>Today: </strong>{" "}
                <span className="dashboardCard__values">
                  {resellers.today_clients}
                </span>
              </div>
              <div>
                <strong>Subresellers: </strong>{" "}
                <span className="dashboardCard__values">
                  {resellers.subresellers_count}
                </span>
              </div>
            </div>
          </CardContainer>
        )}
      {widgets &&
        widgets.reseller &&
        widgets.reseller.enabled &&
        widgets.reseller.enabled === "true" && (
          <CardContainer
            title={"Resellers activations"}
            icon={ICONS.RESELLER_ACTIVATION}
            iconColor={"#934fdf"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <div className="dashboardCard__resellers-activations">
              <div>
                <div>
                  <strong>Total: </strong>{" "}
                  <span className="dashboardCard__values">
                    {resellersActivations && resellersActivations.res_act_total}
                  </span>
                </div>
                <div>
                  <strong>Paid: </strong>{" "}
                  <span className="dashboardCard__values">
                    {resellersActivations &&
                      resellersActivations.total &&
                      parseFloat(resellersActivations.total).toFixed(2)}
                  </span>
                  <span className="currency-style">{currency}</span>
                </div>
              </div>

              <div>
                <div>
                  <strong>Today: </strong>{" "}
                  <span className="dashboardCard__values">
                    {resellersActivations && resellersActivations.res_act_today}
                  </span>
                </div>
                <div>
                  <strong>Paid: </strong>{" "}
                  {resellersActivations && resellersActivations.today && (
                    <span className="dashboardCard__values">
                      {parseFloat(resellersActivations.today).toFixed(2)}
                      <span className="currency-style">{currency}</span>

                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContainer>
        )}
    </div>
  );
}
