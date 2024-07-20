import classes from "../style/usedDevicesStatistiqs.module.scss";
import UsedDevicesProgres from "./UsedDevicesProgres";
import DeviceCardStatistiq from "./DeviceCardStatistiq";
import REQUESTS from "../../../api/requests";
import { useSelector } from "react-redux";
import { selectTranslation } from "../../../features/Translation/TranslationSlice";
import TEXT from "../../../config/text";
import { useEffect, useState } from "react";

function UsedDevices() {
    const [usedDevices, setUsedDevices] = useState();
    const translation = useSelector(selectTranslation);

    function getUsedDevices() {
        function collBack(data) {
            setUsedDevices(data);
        }
        REQUESTS.STATISTICS.COUNT_USED_DEVICES(collBack);
    }

    useEffect(() => {
        getUsedDevices();
    }, []);

    return (
        <div className={classes["device_statistiqs_block"]}>
            <div className={classes["device_statistiqs_div"]}>
                {usedDevices &&
                    Object.values(usedDevices).map((el, i) => {
                        return (
                            <DeviceCardStatistiq
                                title={usedDevices && Object.keys(usedDevices)[i]}
                                total_payment={el?.total_payment?.payment}
                                total_users={el.total}
                                percent={el.percent}
                                users={el.count}
                                icon={el.icon}
                                translation={translation}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default UsedDevices;
