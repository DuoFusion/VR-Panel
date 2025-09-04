import { Select, Switch } from "antd";
import { FC } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { CardHeaderProps } from "../types";

const CardWrapper: FC<CardHeaderProps> = ({ title, headClassName, searchClassName, buttonLabel, isActive, typeFilterOptions, typeFilterPlaceholder, isEditing, children, bodyProps = {}, cardProps = {}, onSearch, onButtonClick, onTypeFilterChange, onActiveFilterChange, setIsEditing }) => {
  return (
    <Card {...cardProps}>
      <CardHeader className={`card-header-box ${headClassName || ""}`}>
        <Row className="g-3">
          {title && (
            <Col md="10" sm="7" xs="12" className="d-flex align-items-center">
              <h5>{title}</h5>
            </Col>
          )}
          {onSearch && (
            <Col xs="12" className={searchClassName}>
              <div className="form-group position-relative">
                <Input type="text" placeholder="Search" onChange={(e) => onSearch?.(e.target.value)} />
                <i className="fa fa-search" />
              </div>
            </Col>
          )}
          {onTypeFilterChange && (
            <Col xl="2" md="3" sm="7" xs="12">
              <Select showSearch allowClear optionFilterProp="label" placeholder={typeFilterPlaceholder || "Select a user"} options={typeFilterOptions} onChange={(val) => onTypeFilterChange(val)} filterOption={(input, option) => (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())} />
            </Col>
          )}
          {onActiveFilterChange && (
            <Col xl="2" md="3" sm="7" xs="12" className="d-flex align-items-center">
              <span className="me-2">isActive:</span>
              <Switch checked={!!isActive} onChange={onActiveFilterChange} />
            </Col>
          )}
          {setIsEditing && (
            <Col md="2" sm="5" xs="12">
              <Button color="primary" className="w-100" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </Col>
          )}
          {onButtonClick && (
            <Col xl="2" md="3" sm="5" xs="12">
              <Button color="primary" className="w-100" onClick={onButtonClick}>
                {buttonLabel}
              </Button>
            </Col>
          )}
        </Row>
      </CardHeader>
      {children && <CardBody {...bodyProps}>{children}</CardBody>}
    </Card>
  );
};

export default CardWrapper;
