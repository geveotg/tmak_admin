import classes from "../style/deviceCardStatistiq.module.scss";
import TEXT from "../../../config/text";
import { Progress } from "antd";

function DeviceCardStatistiq({
    title,
    total_users,
    users,
    icon,
    translation,
    total_payment,
    percent,
}) {
    return (
        <div className={classes["cardStatistiq"]}>
            <div className={classes["device_card_tite"]}>
                <img
                    width={40}
                    src={icon || "assets/img/tizen.png"}
                    className={classes["device_card_img"]}
                    loading="lazy"
                    alt="img"
                />
                <p className={classes["device_card_tite_text"]}>{title}</p>
            </div>
            <div className={classes["users_statistiqs"]}>
                {/* <p className={classes["device_card_text"]}>
          {users}/{total_users} {translation["Devices"] || TEXT["Devices"]}
        </p> */}

                <Progress
                    type="circle"
                    percent={percent}
                    format={(percent) => (
                        <p className={classes["device_card_text"]}>
                            {" "}
                            {parseFloat(percent).toFixed()}%<br />
                            {translation["Devices"] || TEXT["Devices"]} <br />
                            {users}/{total_users}
                        </p>
                    )}
                    showInfo={true}
                    trailColor="#989aa3"
                    width={90}
                    strokeWidth={7}
                    strokeColor={{
                        "0%": "#108ee9",
                        // '100%': '#87d068',
                    }}
                />
            </div>
            <div
                className={classes["device_card_percent_line"]}
                // style={{
                //   background: `linear-gradient(90deg, rgba(70,252,73,1)
                //    ${percent}%, rgba(255,255,255,1) 0%)`,
                // }}
            >
                <p className={classes["device_card_text"]}>
                    {translation["Payment"] || TEXT["Payment"]}
                </p>

                <p className={classes["device_card_payment"]}>{total_payment}</p>
            </div>
        </div>
    );
}

export default DeviceCardStatistiq;
