import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Queries } from "../../api";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { RegistrationType, UserRegistrationType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const UserRegistrationContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const { data: Testomonials, isLoading: isTestomonialsLoading } = Queries.useGetUserRegistration(params);
  const All_Testomonials = Testomonials?.data;

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
      <Breadcrumbs mainTitle="Testomonials" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)}>
          <Table
            className="custom-table"
            dataSource={All_Testomonials?.users}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record.email}
            scroll={{ x: "max-content" }}
            loading={isTestomonialsLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_Testomonials?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
            rowSelection={{
              type: "checkbox",
              onChange: (selectedRowKeys, selectedRows) => {
                console.log("Selected Row Keys:", selectedRowKeys);
                console.log("Selected Rows:", selectedRows);
              },
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default UserRegistrationContainer;
