import { Button, Flex, Image, Modal, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { TestomonialsType } from "../../types";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";

const TestomonialsContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const navigate = useNavigate();
  const { mutate: DeleteTestomonials } = Mutations.useDeleteTestomonials();

  const { data: Testomonials, isLoading: isTestomonialsLoading } = Queries.useGetTestomonials(params);
  const All_Testomonials = Testomonials?.data;
  const handleNavigate = ROUTES.TESTOMONIALS.ADD_EDIT_TESTOMONIALS;

  const handleEdit = (item: TestomonialsType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<TestomonialsType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "priority", dataIndex: "priority", key: "priority" },
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "name", dataIndex: "name", key: "name" },
    { title: "role", dataIndex: "role", key: "role" },
    { title: "message", dataIndex: "message", key: "message", width: 400 },
    { title: "rating", dataIndex: "rating", key: "rating", render: (rating: number) => <Rate allowHalf value={rating} disabled/> },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (image ? <Image src={image} width={60} height={60} alt="courses_image" fallback="/placeholder.png" /> : "-"),
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
                content: `Do you really want to delete "${record?.name}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteTestomonials(record?._id),
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
      <Breadcrumbs mainTitle="Testomonials" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" buttonLabel="Add Testomonials" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_Testomonials?.testomonial_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isTestomonialsLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_Testomonials?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default TestomonialsContainer;
