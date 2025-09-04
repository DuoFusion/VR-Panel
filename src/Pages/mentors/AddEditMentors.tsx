import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Facebook, Instagram, LinkCircle, Xrp } from "iconsax-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ImageUpload, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { MentorsFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { MentorsSchema } from "../../utils/ValidationSchemas";

const AddEditMentors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useMentors, isPending: isMentorsAdding } = Mutations.useMentors();
  const { mutate: upEditMentors, isPending: isMentorsUpdating } = Mutations.useEditMentors();

  const initialValues: MentorsFormValues = {
    name: initialData?.name || "",
    role: initialData?.role || "",
    experience: initialData?.experience || "",
    image: initialData?.image ? [initialData.image] : [],
    priority: initialData?.priority || null,
    socialMedia: {
      instagram: initialData?.socialMedia?.instagram || "",
      facebook: initialData?.socialMedia?.facebook || "",
      linkedin: initialData?.socialMedia?.linkedin || "",
      x: initialData?.socialMedia?.x || "",
    },
  };

  const handleNavigate = () => navigate(ROUTES.MENTORS.MENTORS);

  const handleSubmit = async (values: MentorsFormValues, { resetForm }: FormikHelpers<MentorsFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditMentors({ mentorsId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useMentors(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Mentors`} parent="Mentors" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Mentors`}>
          <div className="input-items">
            <Formik<MentorsFormValues> initialValues={initialValues} validationSchema={MentorsSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="name" label="name" type="text" placeholder="Enter name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="role" label="role" type="text" placeholder="Enter role" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="experience" label="experience" type="text" placeholder="Enter experience" />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="socialMedia.instagram" label="Instagram" type="text" placeholder="Instagram Link" inputGroupIcon={<Instagram />} />
                    </Col>
                    <Col md="6">
                      <TextInput name="socialMedia.facebook" label="Facebook" type="text" placeholder="Facebook Link" inputGroupIcon={<Facebook />} />
                    </Col>
                    <Col md="6">
                      <TextInput name="socialMedia.linkedin" label="linkedin" type="text" placeholder="linkedin Link" inputGroupIcon={<LinkCircle />} />
                    </Col>
                    <Col md="6">
                      <TextInput name="socialMedia.x" label="x" type="text" placeholder="x Link" inputGroupIcon={<Xrp />} />
                    </Col>
                    <Col>
                      <ImageUpload name="image" label="Image" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isMentorsAdding || isMentorsUpdating}>
                          Save
                        </Button>
                        <Button htmlType="button" className="btn btn-light ms-3" size="large" onClick={() => handleNavigate()}>
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default AddEditMentors;
