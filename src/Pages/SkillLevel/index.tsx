import { Button, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { SkillLevelType } from "../../types";
import { useBasicTableFilterHelper } from "../../utils/hook";
import { ColumnsWithFallback } from "../../utils/ColumnsWithFallback";

const SkillLevelContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 10 },
    debounceDelay: 500,
  });

  const navigate = useNavigate();
  const { mutate: DeleteSkillLevel } = Mutations.useDeleteSkillLevel();

  const { data: SkillLevel, isLoading: isSkillLevelLoading } = Queries.useGetSkillLevel(params);
  const All_SkillLevel = SkillLevel?.data;
  const handleNavigate = ROUTES.SKILL_LEVEL.ADD_EDIT_SKILL_LEVEL;

  const handleEdit = (item: SkillLevelType) => {
    navigate(handleNavigate, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<SkillLevelType> = [
    { title: "Sr No.", key: "index", fixed: "left", render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1 },
    { title: "priority", dataIndex: "priority", key: "priority" },
    { title: "Skill Level Id", dataIndex: "_id", key: "_id" },
    { title: "Skill Level Title", dataIndex: "title", key: "title" },
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
                onOk: () => DeleteSkillLevel(record?._id),
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
      <Breadcrumbs mainTitle="Skill Level" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper onSearch={(e) => handleSetSearch(e)} searchClassName="col-xl-10 col-md-9 col-sm-7" buttonLabel="Add Skill Level" onButtonClick={() => navigate(handleNavigate)}>
          <Table
            className="custom-table"
            dataSource={All_SkillLevel?.skill_level_data}
           columns={ColumnsWithFallback(columns)}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isSkillLevelLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: All_SkillLevel?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default SkillLevelContainer;
