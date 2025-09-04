import { Fragment } from "react";
import { Breadcrumbs } from "../../coreComponents";
import { CardWrapper } from "../../coreComponents";
import { Container } from "reactstrap";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { Mutations, Queries } from "../../api";
import { Button, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { CategoryType } from "../../types";
import { Edit, Trash } from "iconsax-react";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";

const CategoryContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });
  const navigate = useNavigate();
  const { mutate: DeleteCategory } = Mutations.useDeleteCategory();

  const { data: category, isLoading: isCategoryLoading } = Queries.useGetCategory(params);
  const All_Category = category?.data;
  const handleNavigate = ROUTES.CATEGORY.ADD_EDIT_CATEGORY;

  const handleEdit = (item: CategoryType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<CategoryType> = [
    {
      title: "Sr No",
      key: "index",
      render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
    },
    {
      title: "priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Category Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
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
                content: `Do you really want to delete "${record.name}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteCategory(record?._id),
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
      <Breadcrumbs mainTitle="Category" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" buttonLabel="Add Category" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_Category?.category_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isCategoryLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_Category?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default CategoryContainer;
