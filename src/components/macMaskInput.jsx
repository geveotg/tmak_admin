import InputMask from "react-input-mask";

import { SearchOutlined } from "@ant-design/icons";

export default function macMaskInput() {
    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <InputMask
                    mask="**:**:**:**:**:**"
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({ closeDropdown: false });
                    }}
                />
            );
        },
        filterIcon: () => {
            return <SearchOutlined />;
        },
    };
}
