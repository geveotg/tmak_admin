import { Modal } from "antd";
const { confirm } = Modal;
export default function showPropsConfirm (
  id,
  myfunction,
  loading,
  text,
  backgroundColor,
  tilte = "Are you sure you want to delete?",
  censel = "CANCEL"
) {
  confirm({
    content: tilte,
    okText: text,
    okType: "default",
    okButtonProps: {
      disabled: false,
      style: {
        backgroundColor: backgroundColor,
        color: "#fff",
      },
      loading: loading,
    },
    cancelText: censel,
    onOk() {
      myfunction(id);
    },
    onCancel() {},
  });
}
