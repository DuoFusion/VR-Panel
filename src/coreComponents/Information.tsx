import { FC, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { Form } from "reactstrap";
import { ToolbarOptions } from "../data";
import { InformationProp } from "../types";
import CardWrapper from "./CardWrapper";
import { Button } from "antd";

const Information: FC<InformationProp> = ({ headerTitle, editorContent, setEditorContent, handleSubmit, isEditing, setIsEditing ,loading}) => {
  const [value, setValue] = useState(editorContent);

  const quillRef = useRef<ReactQuill>(null);

  const onEditorChange = (content: string) => {
    setValue(content);
    setEditorContent(content);
  };

  useEffect(() => {
    if (editorContent && editorContent !== value) {
      setValue(editorContent);
    }
  }, [editorContent, value]);
  return (
    <CardWrapper title={headerTitle} isEditing={isEditing} setIsEditing={setIsEditing}>
      <ReactQuill className="information" ref={quillRef} theme="snow" value={value} onChange={onEditorChange} modules={{ toolbar: ToolbarOptions }} readOnly={!isEditing} />
      {isEditing && (
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mt-3 mb-0">
            <Button loading={loading} htmlType="submit" color="primary">Save</Button>
          </div>
        </Form>
      )}
    </CardWrapper>
  );
};

export default Information;
