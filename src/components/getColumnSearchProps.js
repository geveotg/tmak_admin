export default function (data) {
  let dataIndex =data
  function getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
      return (
        <Input
          allowClear
          autoFocus
          placeholder="Type text here"
          value={selectedKeys[0]}
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
}
