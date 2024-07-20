import REQUESTS from "../../../api/requests";
import { useEffect, useState, useContext } from "react";
import { Table, Button, Input, Modal, DatePicker, Switch, Popover, Image } from "antd";
import { emptyContext } from "../../../context_empty/context_empty";
import TableButtons from "../../../components/TableButtons";
import classes from "../style/sandalsTable.module.scss";
import { useSelector } from "react-redux";
import { selectTranslation } from "../../../features/Translation/TranslationSlice";
import SandalsTableDrawer from "./sandalsTableDrawer";
import SandalsTableEditDrawer from "./sandalsTableEDitDrawer";
import getMyDate from "../../../components/getMyDate";
import TEXT from "../../../config/text";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    ShoppingOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import InitialParams from "../../../components/InitialParams";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { data } from "../data";
const { RangePicker } = DatePicker;
const { confirm } = Modal;

function SandalsTable({ id, name, sanalsVisible, category_id }) {
    const [empty, setEmpty] = useContext(emptyContext);
    const [searchParams, setsearchParams] = useSearchParams();
    const [total, setTotal] = useState();
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [editSandals, setEditSandals] = useState(null);
    const [date, setDate] = useState("");
    const [userSandalsList, setUserSandalsList] = useState([]);
    const [sort, setSort] = useState(["id", "DESC"]);
    const [edit, setEdit] = useState(false);
    const [search, setSearch] = useState({
        comment: "",
    });
    const translation = useSelector(selectTranslation);
    const navigate = useNavigate();

    InitialParams(setLimit, setCurrentPage, setSearch, setSort);

    const goToPosts = (params) =>
        navigate({
            search: `?${createSearchParams(params)}`,
        });

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <Input
                    allowClear
                    autoFocus
                    placeholder="Type text here"
                    value={search[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({ closeDropdown: false });
                    }}
                />
            );
        },
        filterIcon: () => {
            return (
                <>
                    <SearchOutlined />
                </>
            );
        },
    });

    const deleteTable = (id) => {
        const callback = (data) => {
            getSandals();
        };

        const errorCallback = (data) => {};

        REQUESTS.NEWS.DELETE(id, callback, errorCallback);
    };

    const handleMenuClick = (e, item) => {
        switch (e.key) {
            case "delete":
                showPropsConfirm(item.id);
                break;

            case "edit":
                setEditSandals(item);
                setEdit(true);
                break;

            default:
                break;
        }
    };

    const showPropsConfirm = (id) => {
        confirm({
            content: "Are you sure you want to delete?",
            okText: "DELETE",
            okType: "default",
            okButtonProps: {
                disabled: false,
                style: {
                    backgroundColor: "#bf4342",
                    color: "#fff",
                },
                loading: loading,
            },

            cancelText: "CANCEL",
            onOk() {
                deleteTable(id);
            },

            onCancel() {},
        });
    };

    const columns = [
        {
            title: "#",
            width: "60px",
            dataIndex: "id",
            render: (text, record, index) => {
                if (currentPage === 1) {
                    return index + 1;
                } else {
                    return limit * (currentPage - 1) + index + 1;
                }
            },
        },

        {
            title: `Name`,
            width: "100px",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps(),
        },

        {
            title: `${translation["Images"] || TEXT["Images"]}`,
            width: "150px",
            dataIndex: "images",
            render: (record, text, index) => {
                return <img width={100} src={`http://localhost:3001/uploads/${record}`} />;
            },
        },

        {
            title: "",
            width: "60px",
            dataIndex: "action",
            // align: "center",
            render: (text, record, index) => (
                <TableButtons
                    handleMenuClick={(e) => handleMenuClick(e, record)}
                    buttons={[
                        {
                            key: "edit",
                            text: `${translation["Edit"] || TEXT["Edit"]}`,
                            icon: <EditOutlined />,
                        },
                        {
                            key: "delete",
                            text: `${translation["Delete"] || TEXT["Delete"]}`,
                            icon: <DeleteOutlined />,
                        },
                    ]}
                />
            ),
        },
    ];

    const getSandals = () => {
        setLoading(true);

        const query = {
            page: 0,
            // category_id: id,
            limit,
            // pagination: 1,
            subcategoryName: name,
            // sort: JSON.stringify(sort),
            // search: {},
        };

        // if (search.title) {
        //     query.search["title"] = search.title[0];
        // }
        // if (search.description) {
        //     query.search["description"] = search.description[0];
        // }

        // if (query.search) {
        //     query.search = JSON.stringify(query.search);
        // }

        // if (date && date[0]) {
        //     let to = new Date(date[1]);
        //     to.setDate(to.getDate() + 1);
        //     query.between = JSON.stringify({
        //         createdAt: {
        //             from: new Date(date[0]),
        //             to: new Date(to),
        //         },
        //     });
        // }

        // goToPosts(query);

        REQUESTS.NEWS.GET(query, (data) => {
            setCurrentPage(Number(data?.page + 1));

            setLoading(false);

            setUserSandalsList(data?.rows);
            if (!data == []) {
                setEmpty(false);
            }
        });
    };

    useEffect(() => {
        return () => {
            setEmpty(true);
        };
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            setSort([sorter.field, sorter.order === "ascend" ? "ASC" : "DESC"]);
        }
        setSearch(filters);

        if (Object.values(filters)[0]) {
            //   setTitleSearch(Object.values(filters)[0].join(""));
        } else {
            //   setTitleSearch(null);
        }

        setCurrentPage(pagination.current);
        setLimit(pagination.pageSize);
    };

    const onClickAdd = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
        setEditSandals(null);
    };

    const closeEditDrawer = () => {
        setEdit(false);
    };

    useEffect(() => {
        let timout = setTimeout(() => {
            if (sanalsVisible) {
                getSandals();
            }
        }, 500);
        return () => {
            clearTimeout(timout);
        };
    }, [currentPage, limit, sanalsVisible]);

    const followAddElement = {
        setCurrentPage: setCurrentPage,
        setSearch: setSearch,
        setSort: setSort,
        setCurrentPage: setCurrentPage,
        setLimit: setLimit,
        setTotal: setTotal,
        setDate: setDate,
    };

    return (
        <div className={classes["package_list_table"]}>
            <div className={classes["package_list_title"]}>
                <p className={classes["package_title-text"]}>
                    {translation["Sandals"] || TEXT["Sandals"]}
                </p>
                <Button
                    className={classes["package_add"]}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onClickAdd}
                />
            </div>

            <Table
                // loading={loading}
                rowKey="id"
                columns={columns}
                dataSource={userSandalsList}
                onChange={handleTableChange}
                pagination={{
                    position: ["bottomCenter"],
                    current: currentPage,
                    total: total,
                    pageSize: limit,
                    showSizeChanger: true,
                    // defaultPageSize: 1,
                }}
                scroll={{ x: "max-content" }}
            />

            <SandalsTableDrawer
                visible={visible}
                onClose={closeDrawer}
                current={editSandals}
                getData={getSandals}
                translation={translation}
                followAddElement={followAddElement}
                id={id}
                category_id={category_id}
            />

            <SandalsTableEditDrawer
                visible={edit}
                onClose={closeEditDrawer}
                category={editSandals}
                id={editSandals?.id}
                category_id={category_id}
                translation={translation}
                followAddElement={followAddElement}
            />
        </div>
    );
}

export default SandalsTable;
