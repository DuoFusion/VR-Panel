import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Fragment, Key, useState } from "react";
import { Container } from "reactstrap";
import { Queries } from "../../api";
import { Breadcrumbs, CardWrapper, MessageModel } from "../../coreComponents";
import { RegistrationType, UserRegistrationType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { useAppDispatch } from "../../store/hooks";
import { KEYS, URL_KEYS } from "../../constants";
import { setMessageModal } from "../../store/slices/LayoutSlice";

const UserRegistrationContainer = () => {
  const [isUserSelect, setUserSelect] = useState<Key[]>([]);

  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const dispatch = useAppDispatch();

  const { data: UserRegistration, isLoading: isUserRegistrationLoading } = Queries.useGetUserRegistration(params);
  const All_UserRegistration = UserRegistration?.data;

  const columns: ColumnsType<UserRegistrationType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "name", dataIndex: "name", key: "name" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "whatsApp Number", dataIndex: "whatsAppNumber", key: "whatsAppNumber" },
    {
      title: "courses",
      dataIndex: "courses",
      key: "courses",
      width: 300,
      render: (courses) =>
        courses?.length > 0
          ? courses?.map((item: RegistrationType, index: number) => {
              const colors = ["cyan", "purple", "pink", "red", "blue", "default"];
              const color = colors[index % colors.length];
              return (
                <Tag color={color} key={index}>
                  {item?.title}
                </Tag>
              );
            })
          : "-",
    },
    {
      title: "workshops",
      dataIndex: "workshops",
      key: "workshops",
      width: 300,
      render: (workshops) =>
        workshops?.length > 0
          ? workshops?.map((item: RegistrationType, index: number) => {
              const colors = ["cyan", "purple", "pink", "red", "blue", "default"];
              const color = colors[index % colors.length];
              return (
                <Tag color={color} key={index}>
                  {item?.title}
                </Tag>
              );
            })
          : "-",
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs mainTitle=" User Registration" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" buttonLabel="Send Message" onButtonClick={() => dispatch(setMessageModal())}>
          <Table
            className="custom-table"
            dataSource={All_UserRegistration?.users}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record.id}
            scroll={{ x: "max-content" }}
            loading={isUserRegistrationLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_UserRegistration?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
            rowSelection={{
              type: "checkbox",
              onChange: (selectedRowKeys) => setUserSelect(selectedRowKeys),
            }}
          />
        </CardWrapper>
      </Container>
      <MessageModel userSelect={isUserSelect} queryKey={KEYS.USER_REGISTRATION.MESSAGE} apiUrl={URL_KEYS.USER_REGISTRATION.MESSAGE} />
    </Fragment>
  );
};

export default UserRegistrationContainer;
