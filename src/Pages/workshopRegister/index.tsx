import { Button, Flex, Modal, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment, Key, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { KEYS, ROUTES, URL_KEYS } from "../../constants";
import { Breadcrumbs, CardWrapper, MessageModel } from "../../coreComponents";
import { WorkshopRegisterType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { useAppDispatch } from "../../store/hooks";
import { setMessageModal } from "../../store/slices/LayoutSlice";

const WorkshopRegisterContainer = () => {
  const [isUserSelect, setUserSelect] = useState<Key[]>([]);
  // console.log("Selected Row Keys:", isUserSelect);

  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    { title: "User whatsApp Number", dataIndex: "whatsAppNumber", key: "whatsAppNumber" },
    { title: "fees", dataIndex: "fees", key: "fees" },
    { title: "payment Status", dataIndex: "paymentStatus", key: "paymentStatus", render: (paymentStatus: string) => <Tag color={paymentStatus === "Success" ? "green" : paymentStatus === "Pending" ? "blue" : "red"}>{paymentStatus}</Tag> },
    { title: "city", dataIndex: "city", key: "city" },
    { title: "gender", dataIndex: "gender", key: "gender" },
    { title: "standard", dataIndex: "standard", key: "standard" },
    { title: "school Name", dataIndex: "schoolName", key: "schoolName" },
    { title: "previous Percentage", dataIndex: "previousPercentage", key: "previousPercentage" },
    { title: "target Percentage", dataIndex: "targetPercentage", key: "targetPercentage" },
    { title: "goal", dataIndex: "goal", key: "goal" },
    { title: "razorpay Payment ID", dataIndex: "razorpayPaymentId", key: "razorpayPaymentId" },
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
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" buttonLabel="Send Message" onButtonClick={() => dispatch(setMessageModal())}>
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
            rowSelection={{
              type: "checkbox",
              onChange: (selectedRowKeys) => setUserSelect(selectedRowKeys),
            }}
          />
        </CardWrapper>
      </Container>
      <MessageModel userSelect={isUserSelect} queryKey={KEYS.WORKSHOP_REGISTER.MESSAGE} apiUrl={URL_KEYS.WORKSHOP_REGISTER.MESSAGE}/>
    </Fragment>
  );
};

export default WorkshopRegisterContainer;
