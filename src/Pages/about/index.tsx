import { Col } from "antd";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Mutations, Queries } from "../../api";
import { Breadcrumbs } from "../../coreComponents";
import Information from "../../coreComponents/Information";

const AboutContainer = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: useAbout, isPending: isAboutAdding } = Mutations.useAbout();
  const { data: About } = Queries.useGetAbout();
  const allAboutUs = About?.data;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      useAbout({ aboutUs: editorContent }, { onSuccess: () => setIsEditing(false) });
    } catch (error) {}
  };

  useEffect(() => {
    if (allAboutUs) {
      setEditorContent(allAboutUs?.aboutUs);
    }
  }, [allAboutUs]);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="About" parent="Pages" />
      <Col xl="12">
        <Information headerTitle="About Us" loading={isAboutAdding} editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
      </Col>
    </Fragment>
  );
};

export default AboutContainer;
