import { Button, Flex, Modal, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Trash } from "iconsax-react";
import { Fragment, Key, useState } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { Breadcrumbs, CardWrapper, EmailMessageModel } from "../../coreComponents";
import { NewsLetterType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { ArchiveStatus } from "../../data";
import { useAppDispatch } from "../../store/hooks";
import { setEmailMessageModal } from "../../store/slices/LayoutSlice";
import { KEYS, URL_KEYS } from "../../constants";

const NewsLetterContainer = () => {
  const [isUserSelect, setUserSelect] = useState<Key[]>([]);

  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
    sortKey: "archiveFilter",
  });

  const dispatch = useAppDispatch();

  const { mutate: DeleteNewsLetter } = Mutations.useDeleteNewsLetter();
  const { mutate: HandleActive, isPending: isHandleActiveLoading } = Mutations.useNewsLetterHandleActive();

  const { data: NewsLetter, isLoading: isNewsLetterLoading } = Queries.useGetNewsLetter(params);
  const All_NewsLetter = NewsLetter?.data;

  const columns: ColumnsType<NewsLetterType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "email", dataIndex: "email", key: "email" },
    {
      title: "archive",
      dataIndex: "archive",
      key: "archive",
      render: (archive, record) => <Switch checked={archive} className="switch-xsm" onChange={(checked) => HandleActive({ newsLetterId: record._id.toString(), archive: checked })} />,
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
      <Breadcrumbs mainTitle="News Letter" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-md-6 col-xl-8" typeFilterPlaceholder="Select Status" typeFilterOptions={ArchiveStatus} onTypeFilterChange={handleSetSortBy} buttonLabel="Send Message" onButtonClick={() => dispatch(setEmailMessageModal())}>
          <Table
            className="custom-table"
            dataSource={All_NewsLetter?.newsLetter_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record?.email}
            scroll={{ x: "max-content" }}
            loading={isNewsLetterLoading || isHandleActiveLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_NewsLetter?.totalData,
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
      <EmailMessageModel userSelect={isUserSelect} queryKey={KEYS.NEWS_LETTER.MESSAGE} apiUrl={URL_KEYS.NEWS_LETTER.MESSAGE} />
    </Fragment>
  );
};

export default NewsLetterContainer;
