import React from "react";
import classes from './style/tableButtons.module.scss'
import {EllipsisOutlined,DeleteOutlined  } from '@ant-design/icons'
import { Dropdown, Menu, Button } from "antd";




export default function TableButtons({ handleMenuClick, buttons = [], disabled=null}) {
    return (
        <Dropdown
            destroyPopupOnHide={true}
            trigger={["click"]}
            placement="bottomRight"
            className="table-action-button"
            overlay={
                <Menu onClick={handleMenuClick} style={{ minWidth: 130 }}>
                    {buttons.map((item) => {
                        return (
                            <Menu.Item 
                            disabled={item.disabled} 
                            className={classes["action_button"]} key={item.key} 
                            icon={item.icon}>
                                {item.text}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            }
        >
            <Button icon={<EllipsisOutlined /> } />

            

        </Dropdown>
    );
}

