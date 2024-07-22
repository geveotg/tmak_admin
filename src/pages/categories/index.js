import REQUESTS from "../../api/requests";
import { useEffect, useState, useContext } from "react";
import { Table, Button, Input, Modal, DatePicker, Popover } from "antd";
import { emptyContext } from "../../context_empty/context_empty";

import { useSelector } from "react-redux";
import { selectTranslation } from "../../features/Translation/TranslationSlice";
import getMyDate from "../../components/getMyDate";
import TEXT from "../../config/text";
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableButtons from "../../components/TableButtons";
import CategoriesDrawer from "./components/categoriesDrawer";
import InitialParams from "../../components/InitialParams";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import classes from "./index.module.scss";
import { categoriesData } from "./data";
import SubCategoriesDrawer from "./components/sandals";

const { RangePicker } = DatePicker;
const { confirm } = Modal;

function Categories() {
    const [empty, setEmpty] = useContext(emptyContext);
    const [searchParams, setsearchParams] = useSearchParams();
    const [total, setTotal] = useState(10);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [edicategories, setEdicategories] = useState(null);
    const [date, setDate] = useState("");
    const [categories, setCategories] = useState(categoriesData.message);
    const [sort, setSort] = useState(["id", "DESC"]);
    const [sandalTable, setSandalTable] = useState(null);
    const [sandalTableVisible, setSandalTableVisible] = useState(null);
    const [search, setSearch] = useState({
        comment: "",
    });

    InitialParams(setLimit, setCurrentPage, setSearch, setSort);

    const navigate = useNavigate();
    const goToPosts = (params) =>
        navigate({
            search: `?${createSearchParams(params)}`,
        });

    const translation = useSelector(selectTranslation);
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
            return <SearchOutlined />;
        },
    });

    const deleteTable = (id) => {
        const callback = (data) => {
            getCategories();
        };

        const errorCallback = (data) => {};

        REQUESTS.CATEGORIES.DELETE(id, callback, errorCallback);
    };

    const handleMenuClick = (e, item) => {
        switch (e.key) {
            case "delete":
                showPropsConfirm(item.id);
                break;

            case "edit":
                setEdicategories(item);
                setVisible(true);
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
    // const deleteCoupon = (id) => {
    //     const callback = (data) => {
    //         getCategories();
    //     };

    //     const errorCallback = (data) => {};

    //     REQUESTS.CATEGORIES.DELETE(id, callback, errorCallback);
    // };

    const columns = [
        {
            title: "#",
            width: "60px",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => {
                if (currentPage === 1) {
                    return Number(index) + 1;
                } else {
                    return limit * (currentPage - 1) + Number(index) + 1;
                }
            },
        },

        {
            title: `Name`,
            dataIndex: "name",
            key: "name",
            align: "center",

            ...getColumnSearchProps(),
            render: (record, text, index) => {
                if (record) {
                    const content = JSON.parse(record)["arm"];
                    return <div className={classes["ref-link"]}>{content}</div>;
                }
            },
        },
        {
            title: `Surname`,
            dataIndex: "surname",
            key: "surname",
            align: "center",

            ...getColumnSearchProps(),
            render: (record, text, index) => {
                if (record) {
                    const content = JSON.parse(record)["arm"];
                    return <div className={classes["ref-link"]}>{content}</div>;
                }
            },
        },
        {
            title: `Position`,
            dataIndex: "position",
            key: "position",
            align: "center",
            render: (record, text, index) => {
                if (record) {
                    const content = JSON.parse(record)["arm"];
                    return <div className={classes["ref-link"]}>{content}</div>;
                }
            },
        },

        {
            title: `Education`,
            dataIndex: "education",
            key: "education",
            align: "center",

            render: (record, text, index) => {
                if (record) {
                    const content = JSON.parse(record)["arm"];
                    return (
                        <Popover content={content}>
                            <div className={classes["ref-link"]}>{content}</div>
                        </Popover>
                    );
                }
            },
        },
        {
            title: `Experience`,
            dataIndex: "experience",
            key: "experience",
            align: "center",

            render: (record, text, index) => {
                if (record) {
                    const content = JSON.parse(record)["arm"];
                    return (
                        <Popover content={content}>
                            <div className={classes["ref-link"]}>{content}</div>
                        </Popover>
                    );
                }
            },
        },
        {
            title: `Trainings`,
            dataIndex: "trainings",
            key: "trainings",
            align: "center",

            render: (record, text, index) => {
                if (record) {
                    const content = JSON.parse(record)["arm"];
                    return (
                        <Popover content={content}>
                            <div className={classes["ref-link"]}>{content}</div>
                        </Popover>
                    );
                }
            },
        },

        {
            title: `Image`,
            width: "150px",
            dataIndex: "image",
            render: (record, text, index) => {
                return <img width={100} src={`http://84.21.171.97:3005${record}`} />;
            },
        },

        {
            title: "",
            dataIndex: "action",
            align: "center",
            render: (text, record, index) => (
                <div onClick={(e) => e.stopPropagation()}>
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
                </div>
            ),
        },
    ];

    const getCategories = () => {
        // setLoading(true);
        const query = {
            page: currentPage,
            limit,
            // pagination: 1,
            sort: JSON.stringify(sort),
            search: {},
        };

        if (search.name) {
            query.search["name"] = search.name[0];
        }

        if (query.search) {
            query.search = JSON.stringify(query.search);
        }

        if (date && date[0]) {
            let to = new Date(date[1]);
            to.setDate(to.getDate() + 1);
            query.between = JSON.stringify({
                createdAt: {
                    from: new Date(date[0]),
                    to: new Date(to),
                },
            });
        }

        goToPosts(query);

        REQUESTS.CATEGORIES.GET(query, (data) => {
            // setTotal(data);
            // setLimit(data.limit);
            if (data?.message?.rows?.length === 0 && currentPage !== 1) {
                setCurrentPage((current) => current - 1);
            } else {
                // setCurrentPage(data?.currentPage);
            }
            setLoading(false);
            setCategories(data.message.rows);
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
        setEdicategories(null);
    };

    const closeSandalsDrawer = () => {
        setSandalTableVisible(false);
    };

    useEffect(() => {
        let timout = setTimeout(() => {
            getCategories();
        }, 500);
        return () => {
            clearTimeout(timout);
        };
    }, [search, currentPage, limit, sort, date]);

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
        <div className={classes["categories_list_table"]}>
            <div className={classes["categories_list_title"]}>
                <p className={classes["categories_title-text"]}>Staff</p>
                <div className={classes["coupon_csv_contenair"]}>
                    <Button
                        className={classes["categories_add"]}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onClickAdd}
                    />
                </div>
            </div>

            <Table
                loading={loading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (e) => {
                            setSandalTable(record);
                            setSandalTableVisible(true);
                            // setVisible(true);
                        },
                    };
                }}
                rowKey="id"
                columns={columns}
                dataSource={categories}
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

            <CategoriesDrawer
                visible={visible}
                onClose={closeDrawer}
                current={edicategories}
                getData={getCategories}
                translation={translation}
                followAddElement={followAddElement}
            />
            {/* <SubCategoriesDrawer
                Info={sandalTable}
                onClose={closeSandalsDrawer}
                visible={sandalTableVisible}
            /> */}
            {/* <SandalsDrawer
                Info={sandalTable}
                onClose={closeSandalsDrawer}
                visible={sandalTableVisible}
            /> */}
        </div>
    );
}

export default Categories;
