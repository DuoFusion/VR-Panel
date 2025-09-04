import { Button, Flex, Image, Modal, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Forbidden, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CategoryType, WorkshopType } from "../../types";
import { FormatDate, FormatTime } from "../../utils/DateFormatted";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { ActiveStatus } from "../../data";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";

const WorkshopContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
    sortKey: "blockFilter",
  });

  const navigate = useNavigate();
  const { mutate: DeleteWorkshop } = Mutations.useDeleteWorkshop();
  const { mutate: HandleActive, isPending: isHandleActiveLoading } = Mutations.useHandleActive();

  const { data: Workshop, isLoading: isWorkshopLoading } = Queries.useGetWorkshop(params);
  const All_Workshop = Workshop?.data;

  const handleNavigate = ROUTES.WORKSHOP.ADD_EDIT_WORKSHOP;

  const handleEdit = (item: WorkshopType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<WorkshopType> = [
    { title: "Sr No.", dataIndex: "index", key: "index", width: 100, fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "priority", dataIndex: "priority", key: "priority" },
    { title: "Workshop Id", dataIndex: "_id", key: "_id" },
    { title: "Workshop Name", dataIndex: "title", key: "title" },
    { title: "date", dataIndex: "date", key: "date", render: (date: string) => (FormatDate(date) ? <Tag color="geekblue">{FormatDate(date)}</Tag> : "-") },
    { title: "time", dataIndex: "time", key: "time", render: (time: string) => (FormatTime(time) ? <Tag color="green">{FormatTime(time)}</Tag> : "-") },
    { title: "duration", dataIndex: "duration", key: "duration" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "category", dataIndex: "categoryId", key: "categoryId", render: (categoryId: CategoryType) => categoryId?.name ?? "-" },
    { title: "status", dataIndex: "status", key: "status" },
    { title: "syllabus", dataIndex: "syllabus", key: "syllabus" },
    { title: "instructor Name", dataIndex: "instructorName", key: "instructorName" },
    {
      title: "instructor Image",
      dataIndex: "instructorImage",
      key: "instructorImage",
      render: (instructorImage: string) => (instructorImage ? <Image src={instructorImage} width={60} height={60} alt="instructor_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "thumbnail Image",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage: string) => (thumbnailImage ? <Image src={thumbnailImage} width={60} height={60} alt="thumbnail_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "workshop Image",
      dataIndex: "workshopImage",
      key: "workshopImage",
      render: (workshopImage: string) => (workshopImage ? <Image src={workshopImage} width={60} height={60} alt="workshop_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "features",
      dataIndex: "features",
      key: "features",
      render: (features: boolean, record: WorkshopType) => <Switch checked={features} className="switch-xsm" onChange={(checked) => HandleActive({ workshopId: record._id.toString(), features: checked })} />,
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
            title="Active/UnActive"
            className={`m-1 p-1 btn ${record?.isBlocked ? "btn-danger" : "btn-success"}`}
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to ${record?.isBlocked ? "UnActive" : "Active"} "${record?.title}"?`,
                okText: "ok",
                cancelText: "Cancel",
                onOk: async () => {
                  await HandleActive({ workshopId: record?._id, isBlocked: !record?.isBlocked });
                },
              });
            }}
          >
            <Forbidden className="action" />
          </Button>
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
                content: `Do you really want to delete "${record?.title}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => DeleteWorkshop(record?._id),
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
      <Breadcrumbs mainTitle="Workshop" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-md-6 col-xl-8" typeFilterPlaceholder="Select Status" typeFilterOptions={ActiveStatus} onTypeFilterChange={handleSetSortBy} buttonLabel="Add Workshop" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_Workshop?.workshop_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isWorkshopLoading || isHandleActiveLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_Workshop?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default WorkshopContainer;
