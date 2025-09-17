import { Button, Flex, Modal, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Trash } from "iconsax-react";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { ArchiveStatus } from "../../data";
import { ContactUsType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const ContactUsContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
    sortKey: "archiveFilter",
  });

  const { mutate: DeleteContactUs } = Mutations.useDeleteContactUs();
  const { mutate: HandleActive, isPending: isHandleActiveLoading } = Mutations.useContactUsHandleActive();

  const { data: ContactUs, isLoading: isContactUsLoading } = Queries.useGetContactUs(params);
  const All_ContactUs = ContactUs?.data;

  const columns: ColumnsType<ContactUsType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "name", dataIndex: "name", key: "name" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "message", dataIndex: "message", key: "message", width: 400 },
    {
      title: "archive",
      dataIndex: "archive",
      key: "archive",
      render: (archive, record) => <Switch checked={archive} className="switch-xsm" onChange={(checked) => HandleActive({ contactUsId: record._id.toString(), archive: checked })} />,
      fixed: "right",
      width: 90,
    },
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
                onOk: () => DeleteContactUs(record?._id),
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
      <Breadcrumbs mainTitle="Contact Us" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" typeFilterPlaceholder="Select Status" typeFilterOptions={ArchiveStatus} onTypeFilterChange={handleSetSortBy}>
          <Table
            className="custom-table"
            dataSource={All_ContactUs?.contactUs_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isContactUsLoading || isHandleActiveLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_ContactUs?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default ContactUsContainer;
