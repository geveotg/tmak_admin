import Icon from "@ant-design/icons";

const MyIcon = ({ children }) => {
  return (
    <Icon
      component={() => {
        return children;
      }}
    />
  );
};

export default MyIcon;
