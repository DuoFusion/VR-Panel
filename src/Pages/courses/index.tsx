import { Button, Flex, Image, Modal, Rate, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash, Whatsapp } from "iconsax-react";
import { Fragment, Key, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { KEYS, ROUTES, URL_KEYS } from "../../constants";
import { Breadcrumbs, CardWrapper, MessageModel } from "../../coreComponents";
import { FeaturesStatus } from "../../data";
import { CoursesType, LanguagesType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { FormatDateTime } from "../../utils/DateFormatted";
import { useAppDispatch } from "../../store/hooks";
import { setMessageModal } from "../../store/slices/LayoutSlice";

const CoursesContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
    sortKey: "featuresFilter",
  });
  const [isUserSelect, setUserSelect] = useState<Key[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: DeleteCourses } = Mutations.useDeleteCourses();
  const { mutate: HandleActive, isPending: isHandleActiveLoading } = Mutations.useCoursesHandleActive();

  const { data: Courses, isLoading: isCoursesLoading } = Queries.useGetCourses(params);
  const All_Courses = Courses?.data;
  const handleNavigate = ROUTES.COURSES.ADD_EDIT_COURSES;

  const handleAdd = () => navigate(handleNavigate, { state: { nextPriority: (All_Courses?.totalData ?? 0) + 1 } });

  const handleEdit = (item: CoursesType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const handleMessage = (item: CoursesType) => {
    dispatch(setMessageModal());
    setUserSelect([item?._id]);
  };

  const columns: ColumnsType<CoursesType> = [
    { title: "Sr No.", key: "index", width: 100, fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "priority", dataIndex: "priority", key: "priority" },
    // { title: "Courses Id", dataIndex: "_id", key: "_id" },
    { title: "Courses title", dataIndex: "title", key: "title" },
    { title: "date & time", dataIndex: "createdAt", key: "createdAt", render: (date: string) => (FormatDateTime(date) ? <Tag color="geekblue">{FormatDateTime(date)}</Tag> : "-") },
    // { title: "background", dataIndex: "background", key: "background" },
    // { title: "short Description", dataIndex: "shortDescription", key: "shortDescription", width: 400 },
    { title: "duration", dataIndex: "duration", key: "duration" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "mrp", dataIndex: "mrp", key: "mrp" },
    { title: "language", dataIndex: "languageId", key: "languageId", render: (languageId) => languageId?.map((item: LanguagesType) => <Tag color="geekblue">{item.name}</Tag>) ?? "-" },
    { title: "total Lectures", dataIndex: "totalLectures", key: "totalLectures" },
    { title: "total Hours", dataIndex: "totalHours", key: "totalHours" },
    { title: "level", dataIndex: "level", key: "level" },
    { title: "review", dataIndex: "review", key: "review", render: (review: number) => <Rate value={review} disabled /> },
    // { title: "instructor Name", dataIndex: "instructorName", key: "instructorName" },
    // { title: "what Will You Learn", dataIndex: "whatWillYouLearn", key: "whatWillYouLearn", width: 400 },
    // {
    //   title: "instructor Image",
    //   dataIndex: "instructorImage",
    //   key: "instructorImage",
    //   render: (instructorImage) => (instructorImage ? <Image src={instructorImage} width={60} height={60} alt="instructor_image" fallback="/placeholder.png" /> : "-"),
    // },
    {
      title: "thumbnail Image",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage: string) => (thumbnailImage ? <Image src={thumbnailImage} width={60} height={60} alt="thumbnail_image" fallback="/placeholder.png" /> : "-"),
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
          {/* <Button
            type="text"
            title={record?.isBlocked ? `Active` : `UnActive`}
            className={`m-1 p-1 btn ${record?.isBlocked ? "btn-success" : "btn-danger"}`}
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to ${!record?.isBlocked ? "Active" : "UnActive"} "${record?.title}"?`,
                okText: "ok",
                cancelText: "Cancel",
                onOk: async () => {
                  await HandleActive({ courseId: record?._id, isBlocked: !record?.isBlocked });
                },
              });
            }}
          >
            <Forbidden className="action" />
          </Button> */}
          <Button type="text" onClick={() => handleMessage(record)} title="Message" className="m-1 p-1 btn btn-success">
            <Whatsapp className="action" />
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
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-md-6 col-xl-8" typeFilterPlaceholder="Select Status" typeFilterOptions={FeaturesStatus} onTypeFilterChange={handleSetSortBy} buttonLabel="Add Courses" onButtonClick={() => handleAdd()}>
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
      <MessageModel userSelect={isUserSelect} queryKey={KEYS.COURSES.MESSAGE} apiUrl={URL_KEYS.COURSES.MESSAGE} />
    </Fragment>
  );
};

export default CoursesContainer;
