import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { info } from "sass";

const SubCategoriesDrawer = ({ onClose, visible, Info }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleChangeWindowInnerWidth = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleChangeWindowInnerWidth);
        return () => window.removeEventListener("resize", handleChangeWindowInnerWidth);
    }, []);

    return (
        <Drawer
            title={`subCategories `}
            placement="right"
            onClose={onClose}
            open={visible}
            width={windowWidth > 880 ? 1000 : "83vw"}
        ></Drawer>
    );
};

export default SubCategoriesDrawer;
