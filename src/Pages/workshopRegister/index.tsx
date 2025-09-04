import { Button, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { WorkshopRegisterType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const WorkshopRegisterContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const navigate = useNavigate();
  const { mutate: DeleteWorkshopRegister } = Mutations.useDeleteWorkshopRegister();

  const { data: WorkshopRegister, isLoading: isWorkshopLoading } = Queries.useGetWorkshopRegister(params);
  const All_WorkshopRegister = WorkshopRegister?.data;

  const handleNavigate = ROUTES.WORKSHOP_REGISTER.ADD_EDIT_WORKSHOP_REGISTER;

  const handleEdit = (item: WorkshopRegisterType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<WorkshopRegisterType> = [
    { title: "Sr No.", dataIndex: "index", key: "index", width: 100, fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "Workshop Name", dataIndex: "workshopId", key: "workshopId", render: (workshopId) => workshopId?.title ?? "-" },
    { title: "User Name", dataIndex: "name", key: "name" },
    { title: "User email", dataIndex: "email", key: "email" },
    { title: "User Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "city", dataIndex: "city", key: "city" },
    { title: "profession", dataIndex: "profession", key: "profession" },
    { title: "payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
    { title: "fees", dataIndex: "fees", key: "fees" },
    { title: "coupon Code", dataIndex: "couponCodeId", key: "couponCodeId", render: (couponCodeId) => couponCodeId?.name ?? "-" },
    { title: "payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
    { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Flex gap="middle" justify="center">
          <Button type="text" onClick={() => handleEdit(record)} title="Edit" className="m-1 p-1 btn btn-primary">
            <Edit className="action" />
          </Button>
          <Button
            type="text"
            danger
            className="m-1 p-1 btn btn-danger"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to delete "${record?.name}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteWorkshopRegister(record?._id),
              });
            }}
            title="Delete"
          >
            <Trash className="action" />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Workshop Register" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)}>
          <Table
            className="custom-table"
            dataSource={All_WorkshopRegister?.workshopRegister_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isWorkshopLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_WorkshopRegister?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default WorkshopRegisterContainer;
