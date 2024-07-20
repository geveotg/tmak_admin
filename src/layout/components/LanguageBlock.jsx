import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { Select } from "antd";

import REQUESTS from "../../api/requests";

import { editTranslation } from "../../features/Translation/TranslationSlice";

import classes from "../style/languageBlock.module.scss";

const LanguageBlock = () => {

    const dispatch = useDispatch();

    const [languages, setLanguages] = useState([]);
    const [selected, setSelected] = useState("");

    const getLanguages = () => {

        let query = {
            filter: JSON.stringify({ is_active: true }),
        };

        function callback(data) {
            let languageId = localStorage.getItem("langId");

            let isDefault = data?.rows[0];

            setLanguages(data?.rows);

            if (languageId) {
                isDefault = data.rows.find((el) => el.id === languageId);
            }

            setSelected(isDefault.id);
        }

        REQUESTS.LANGUAGES(query, callback);
    };

    const handleChange = (value) => {
        localStorage.setItem("langId", value);

        function collback(data) {
            dispatch(editTranslation(data));
        }

        function errorCollback(data) { }

        setSelected(value);

        REQUESTS.TEXT_TRANSLATION(collback, errorCollback, { id: value });
    };

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <div className="language-block">
            <Select
                bordered={false}
                className={classes["select"]}
                dropdownClassName={classes["dropdown"]}
                suffixIcon={null}
                onChange={handleChange}
                value={selected}
                listHeight={135}
            >
                {languages?.map((el) => {
                    return (
                        <Select.Option key={el.id} value={el.id}>
                            <img src={el?.icon} alt="" />
                            <span className={classes["iso-code"]}>
                                {el.iso_code.toUpperCase()}
                            </span>
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default LanguageBlock;
