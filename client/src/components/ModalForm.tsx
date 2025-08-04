import Modal from "./ModalComp";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "./FormFields/ButtonComp";
import FormInput from "./FormFields/FormInput";
import FormFileInput from "./FormFields/FormFileInput";
import FormRadioGroup from "./FormFields/FormRadioGroup";
import FormCheckbox from "./FormFields/FormCheckbox";
import CustomDatePicker from "./FormFields/DateInput";

interface MyFormValues {
  name: string;
  email: string;
}

const MyFormModal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) => {
  const initialValues: MyFormValues = { name: "", email: "" };

  const handleSubmit = (values: MyFormValues) => {
    console.log("Form submitted", values);
    // onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} testId='my-form-modal'>
      <h2 className='text-xl font-semibold mb-4'>{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        })}
        onSubmit={handleSubmit}>
        {({ values, errors, handleChange }) => (
          <Form className='space-y-4'>
            <FormInput
              name='name'
              labelName='Name'
              placeHolder='Enter your name'
              type='text'
              value={values.name}
              onChange={handleChange}
            />
            <FormRadioGroup
              name='gender'
              label='Gender'
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            <Field
              name='startDate'
              component={CustomDatePicker}
              label='Start Date'
            />{" "}
            <FormCheckbox
              name='skills'
              multiple
              options={[
                // { label: "React", value: "react" },
                // { label: "Node.js", value: "node" },
                { label: "Docker", value: "docker" },
              ]}
            />
            <FormFileInput name='ewe' labelName='dsd' />
            <FormInput
              name='email'
              labelName='Email'
              placeHolder='Enter your email'
              type='email'
              onChange={handleChange}
              value={values.email}
            />
            <div className='flex justify-end space-x-4'>
              {/* <Button type='button' variant='danger' onClick={onClose}>
                Close
              </Button> */}
              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default MyFormModal;
