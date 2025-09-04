import { Button, Flex, Modal, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CouponCodeType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { FormatDate } from "../../utils/DateFormatted";

const CouponCodeContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const navigate = useNavigate();
  const { mutate: DeleteCouponCode } = Mutations.useDeleteCouponCode();

  const { data: CouponCode, isLoading: isCouponCodeLoading } = Queries.useGetCouponCode(params);
  const All_CouponCode = CouponCode?.data;
  const handleNavigate = ROUTES.COUPON_CODE.ADD_EDIT_COUPON_CODE;

  const handleEdit = (item: CouponCodeType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<CouponCodeType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "name", dataIndex: "name", key: "name" },
    { title: "code", dataIndex: "code", key: "code" },
    { title: "startDate", dataIndex: "startDate", key: "startDate", render: (startDate) => (FormatDate(startDate) ? <Tag color="geekblue">{FormatDate(startDate)}</Tag> : "-") },
    { title: "endDate", dataIndex: "endDate", key: "endDate", render: (endDate) => (FormatDate(endDate) ? <Tag color="geekblue">{FormatDate(endDate)}</Tag> : "-") },
    { title: "discount Type", dataIndex: "discountType", key: "discountType" },
    { title: "discount", dataIndex: "discount", key: "discount" },
    { title: "number Of Uses", dataIndex: "numberOfUses", key: "numberOfUses" },
    { title: "used Count", dataIndex: "usedCount", key: "usedCount" },
    { title: "description", dataIndex: "description", key: "description", width: 400 },
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
                content: `Do you really want to delete "${record?.code}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteCouponCode(record?._id),
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
      <Breadcrumbs mainTitle="Coupon Code" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" buttonLabel="Add Coupon Code" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_CouponCode?.coupon_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isCouponCodeLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_CouponCode?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default CouponCodeContainer;
