import { Button, Flex, Image, Modal, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Forbidden, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { ActiveStatus } from "../../data";
import { CoursesType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";

const CoursesContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
    sortKey: "blockFilter",
  });

  const navigate = useNavigate();
  const { mutate: DeleteCourses } = Mutations.useDeleteCourses();
  const { mutate: HandleActive, isPending: isHandleActiveLoading } = Mutations.useCoursesHandleActive();

  const { data: Courses, isLoading: isCoursesLoading } = Queries.useGetCourses(params);
  const All_Courses = Courses?.data;
  const handleNavigate = ROUTES.COURSES.ADD_EDIT_COURSES;

  const handleEdit = (item: CoursesType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<CoursesType> = [
    { title: "Sr No.", key: "index", width: 100, fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "priority", dataIndex: "priority", key: "priority" },
    { title: "Courses Id", dataIndex: "_id", key: "_id" },
    { title: "Courses title", dataIndex: "title", key: "title" },
    { title: "background", dataIndex: "background", key: "background" },
    { title: "short Description", dataIndex: "shortDescription", key: "shortDescription", width: 400 },
    { title: "duration", dataIndex: "duration", key: "duration" },
    { title: "skill Level", dataIndex: "skillLevelId", key: "skillLevelId", render: (skillLevelId) => skillLevelId?.title ?? "-" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "total Lectures", dataIndex: "totalLectures", key: "totalLectures" },
    { title: "total Hours", dataIndex: "totalHours", key: "totalHours" },
    { title: "rating", dataIndex: "rating", key: "rating" },
    { title: "what You Learn", dataIndex: "whatYouLearnId", key: "whatYouLearnId", render: (whatYouLearnId) => whatYouLearnId?.title ?? "-" },
    { title: "instructor Name", dataIndex: "instructorName", key: "instructorName" },
    { title: "courseLanguageId", dataIndex: "courseLanguageId", key: "courseLanguageId", render: (courseLanguageId) => courseLanguageId?.name ?? "-" },
    { title: "mrp", dataIndex: "mrp", key: "mrp" },
    { title: "discount", dataIndex: "discount", key: "discount" },
    {
      title: "instructor Image",
      dataIndex: "instructorImage",
      key: "instructorImage",
      render: (instructorImage) => (instructorImage ? <Image src={instructorImage} width={60} height={60} alt="instructor_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "Courses Image",
      dataIndex: "courseImage",
      key: "courseImage",
      render: (courseImage) => (courseImage ? <Image src={courseImage} width={60} height={60} alt="courses_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "features",
      dataIndex: "features",
      key: "features",
      render: (features, record) => <Switch checked={features} className="switch-xsm" onChange={(checked) => HandleActive({ courseId: record._id.toString(), features: checked })} />,
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
            title={record?.isBlocked ? "UnActive" : "Active"}
            className={`m-1 p-1 btn ${record?.isBlocked ? "btn-danger" : "btn-success"}`}
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to ${record?.isBlocked ? "UnActive" : "Active"} "${record?.title}"?`,
                okText: "ok",
                cancelText: "Cancel",
                onOk: async () => {
                  await HandleActive({ courseId: record?._id, isBlocked: !record?.isBlocked });
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
                onOk: () => DeleteCourses(record?._id),
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
      <Breadcrumbs mainTitle="Courses" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-md-6 col-xl-8" typeFilterPlaceholder="Select Status" typeFilterOptions={ActiveStatus} onTypeFilterChange={handleSetSortBy} buttonLabel="Add Courses" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_Courses?.course_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isCoursesLoading || isHandleActiveLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_Courses?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default CoursesContainer;
