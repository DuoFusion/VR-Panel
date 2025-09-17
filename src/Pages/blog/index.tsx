import { Button, Flex, Image, Modal, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { BlogType } from "../../types";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";
import { FormatDateTime } from "../../utils/DateFormatted";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { FeaturesStatus } from "../../data";

const BlogContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange , handleSetSortBy} = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
    sortKey: "featuresFilter",
  });

  const navigate = useNavigate();
  const { mutate: DeleteBlog } = Mutations.useDeleteBlog();
  const { mutate: HandleActive, isPending: isHandleActiveLoading } = Mutations.useBlogHandleActive();

  const { data: Blog, isLoading: isBlogLoading } = Queries.useGetBlog(params);
  const All_Blog = Blog?.data;
  const handleNavigate = ROUTES.BLOG.ADD_EDIT_BLOG;

  const handleEdit = (item: BlogType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<BlogType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    // { title: "priority", dataIndex: "priority", key: "priority" },
    // { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "title", dataIndex: "title", key: "title" },
    { title: "subtitle", dataIndex: "subtitle", key: "subtitle" },
    { title: "tag", dataIndex: "tag", key: "tag" },
    { title: "Date/Time", dataIndex: "createdAt", key: "createdAt", render: (date) => (FormatDateTime(date) ? <Tag color="geekblue">{FormatDateTime(date)}</Tag> : "-") },
    {
      title: "blogImage",
      dataIndex: "blogImage",
      key: "blogImage",
      render: (blogImage: string) => (blogImage ? <Image src={blogImage} width={60} height={60} alt="courses_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "thumbnail Image",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage: string) => (thumbnailImage ? <Image src={thumbnailImage} width={60} height={60} alt="courses_image" fallback="/placeholder.png" /> : "-"),
    },
    {
      title: "features",
      dataIndex: "features",
      key: "features",
      render: (features: boolean, record: BlogType) => <Switch checked={features} className="switch-xsm" onChange={(checked) => HandleActive({ blogId: record._id.toString(), features: checked })} />,
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
                onOk: () => DeleteBlog(record?._id),
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
      <Breadcrumbs mainTitle="Blog" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)}  searchClassName="col-md-6 col-xl-8" typeFilterPlaceholder="Select Status" typeFilterOptions={FeaturesStatus} onTypeFilterChange={handleSetSortBy}  buttonLabel="Add Blog" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_Blog?.blog_data}
            columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isBlogLoading || isHandleActiveLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_Blog?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default BlogContainer;
