import { Button, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Trash } from "iconsax-react";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { LeadFormType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const LeadFormContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const { mutate: DeleteLeadForm } = Mutations.useDeleteLeadForm();

  const { data: LeadForm, isLoading: isLeadFormLoading } = Queries.useGetLeadForm(params);
  const All_LeadForm = LeadForm?.data;

  const columns: ColumnsType<LeadFormType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "full Name", dataIndex: "fullName", key: "fullName" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "phone", dataIndex: "phone", key: "phone" },
    { title: "city", dataIndex: "city", key: "city" },
    { title: "interestId", dataIndex: "interestId", key: "interestId", render: (interestId) => interestId?.name ?? "-" },
    { title: "preferred Learning Mode", dataIndex: "preferredLearningMode", key: "preferredLearningMode" },
    { title: "background", dataIndex: "background", key: "background" },
    { title: "it Knowledge Level", dataIndex: "itKnowledgeLevel", key: "itKnowledgeLevel" },
    { title: "additional Message", dataIndex: "additionalMessage", key: "additionalMessage" },
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
                content: `Do you really want to delete "${record?.fullName}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteLeadForm(record?._id),
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
      <Breadcrumbs mainTitle="LeadForm" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-12 ">
          <Table
            className="custom-table"
            dataSource={All_LeadForm?.leadForm_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isLeadFormLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_LeadForm?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default LeadFormContainer;
