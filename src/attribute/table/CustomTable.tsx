import { Button, Flex, Modal, Table } from "antd";
import { Edit, Forbidden, Trash } from "iconsax-react";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { useBasicTableFilterHelper } from "../../utils/hook";

export interface CommonTableContainerProps<T> {
  title: string;
  parent?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  fetchQuery: (params: any) => { data: any; isLoading: boolean };
  deleteMutation: (id: string) => void;
  toggleMutation?: (payload: any) => void;
  columns: any[];
  rowKey?: (record: T) => string;
  typeFilterOptions?: { value: string; label: string }[];
  onEdit?: (item: T) => void;
}

const CustomTable = <T extends { _id: string; title?: string; isBlocked?: boolean }>({ title, parent = "Pages", buttonLabel, onButtonClick, fetchQuery, deleteMutation, toggleMutation, columns, rowKey = (record) => record._id, typeFilterOptions, onEdit }: CommonTableContainerProps<T>) => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper({ initialParams: { page: 1, limit: 10 }, debounceDelay: 500 });

  const { data, isLoading } = fetchQuery(params);
  const listData = data?.data;

  // Add default action column
  const actionColumn = {
    title: "Options",
    key: "actionIcons",
    width: 120,
    fixed: "right" as const,
    render: (_: any, record: T) => (
      <Flex gap="middle" justify="center">
        {toggleMutation && (
          <Button
            type="text"
            title="Active/UnActive"
            className={`m-1 p-1 btn ${record?.isBlocked ? "btn-danger" : "btn-success"}`}
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to ${record?.isBlocked ? "UnActive" : "Active"} "${record?.title}"?`,
                okText: "ok",
                cancelText: "Cancel",
                onOk: () => toggleMutation({ workshopId: record._id, isBlocked: !record?.isBlocked }),
              });
            }}
          >
            <Forbidden className="action" />
          </Button>
        )}
        {onEdit && (
          <Button type="text" onClick={() => onEdit(record)} title="Edit" className="m-1 p-1 btn btn-primary">
            <Edit className="action" />
          </Button>
        )}
        <Button
          type="text"
          danger
          className="m-1 p-1 btn btn-danger"
          onClick={() => {
            Modal.confirm({
              title: "Are you sure?",
              content: `Do you really want to delete "${record?.title}"?`,
              okText: "Yes, Delete",
              cancelText: "Cancel",
              onOk: () => deleteMutation(record._id),
            });
          }}
          title="Delete"
        >
          <Trash className="action" />
        </Button>
      </Flex>
    ),
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={title} parent={parent} />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={handleSetSearch} searchClassName="col-md-6 col-xl-8" typeFilterPlaceholder="Select Status" typeFilterOptions={typeFilterOptions} onTypeFilterChange={handleSetSortBy} buttonLabel={buttonLabel} onButtonClick={onButtonClick}>
          <Table
            className="custom-table"
            dataSource={listData?.workshop_data}
            columns={[...columns, actionColumn]}
            rowKey={rowKey}
            scroll={{ x: "max-content" }}
            loading={isLoading}
            pagination={{
              current: pageNumber,
              pageSize,
              total: listData?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default CustomTable;
