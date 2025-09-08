import { Button, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CoursesRegisterType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const CoursesRegisterContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const navigate = useNavigate();
  const { mutate: DeleteCoursesRegister } = Mutations.useDeleteCoursesRegister();

  const { data: CoursesRegister, isLoading: isCoursesRegisterLoading } = Queries.useGetCoursesRegister(params);
  const All_CoursesRegister = CoursesRegister?.data;
  const handleNavigate = ROUTES.COURSES_REGISTER.ADD_EDIT_COURSES_REGISTER;

  const handleEdit = (item: CoursesRegisterType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<CoursesRegisterType> = [
    { title: "Sr No.", key: "index", width: 100, fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "course", dataIndex: "courseId", key: "courseId", render: (courseId) => courseId?.title ?? "-" },
    { title: "User Name", dataIndex: "name", key: "name" },
    { title: "User email", dataIndex: "email", key: "email" },
    { title: "User whatsApp Number", dataIndex: "whatsAppNumber", key: "whatsAppNumber" },
    { title: "city", dataIndex: "city", key: "city" },
    { title: "gender", dataIndex: "gender", key: "gender" },
    { title: "standard", dataIndex: "standard", key: "standard" },
    { title: "school Name", dataIndex: "schoolName", key: "schoolName" },
    { title: "previous Percentage", dataIndex: "previousPercentage", key: "previousPercentage" },
    { title: "target Percentage", dataIndex: "targetPercentage", key: "targetPercentage" },
    { title: "goal", dataIndex: "goal", key: "goal" },
    { title: "fees", dataIndex: "fees", key: "fees" },
    { title: "payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
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
                onOk: () => DeleteCoursesRegister(record?._id),
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
      <Breadcrumbs mainTitle="Courses Register" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)}>
          <Table
            className="custom-table"
            dataSource={All_CoursesRegister?.courseRegister_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isCoursesRegisterLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_CoursesRegister?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default CoursesRegisterContainer;
