import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'antd';
import TEXT from '../config/text';
import classes from "./style/macMaskComponentStyle.module.scss";

export default function MacMaskComponent({ value, setValue }) {
    const translation = useSelector((state) => state.translationData.translation);

    const generateMacFormat = (e) => {
        var mac = e.target.value.replace(/[^0-9a-z]/gi, "");

        var result = "";

        for (var i = 0; i < mac.length; i++) {
            if (i % 2 === 0 && i !== 0) {
                result += ":";
            }
            result += mac[i];
        }
        setValue(result.substring(0, 17));
    };

    return (
        <div >
            <Form.Item label={translation["Mac"] || TEXT["Mac"]} >
                <input
                    value={value}
                    onChange={generateMacFormat}
                    name="mac"
                    style={{ width: "100%" }}
                    className={classes['mac-inp']}
                />
            </Form.Item>
        </div>
    )
}
