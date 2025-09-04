import { Button, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Trash } from "iconsax-react";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { NewsLetterType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const NewsLetterContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const { mutate: DeleteNewsLetter } = Mutations.useDeleteNewsLetter();

  const { data: NewsLetter, isLoading: isNewsLetterLoading } = Queries.useGetNewsLetter(params);
  const All_NewsLetter = NewsLetter?.data;

  const columns: ColumnsType<NewsLetterType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "email", dataIndex: "email", key: "email" },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Flex gap="middle" justify="center">
          <Button
            type="text"
            danger
            className="m-1 p-1 btn btn-danger"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to delete "${record?.email}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteNewsLetter(record?._id),
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
      <Breadcrumbs mainTitle="NewsLetter" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-12 ">
          <Table
            className="custom-table"
            dataSource={All_NewsLetter?.newsLetter_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isNewsLetterLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_NewsLetter?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default NewsLetterContainer;
