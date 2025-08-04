import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formik, Form } from "formik";
import FormRadioGroup from "../components/FormFields/FormRadioGroup";

describe("FormRadioGroup", () => {
  const options = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
  ];

  const setup = (initialValue = "") =>
    render(
      <Formik initialValues={{ choice: initialValue }} onSubmit={jest.fn()}>
        <Form>
          <FormRadioGroup name="choice" label="Choose one" options={options} />
        </Form>
      </Formik>
    );

  it("renders all options", () => {
    setup();
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B")).toBeInTheDocument();
  });

  it("checks the selected option", () => {
    setup("B");
    expect(screen.getByLabelText("Option B")).toBeChecked();
    expect(screen.getByLabelText("Option A")).not.toBeChecked();
  });

  it("changes value on click", async () => {
    setup();
    const optionA = screen.getByLabelText("Option A") as HTMLInputElement;
    await waitFor(() => fireEvent.click(optionA));
    expect(optionA.checked).toBe(true);
  });

  it("shows validation error", async () => {
    render(
      <Formik
        initialValues={{ choice: "" }}
        onSubmit={jest.fn()}
        validate={(values) => {
          const errors: any = {};
          if (!values.choice) errors.choice = "Required";
          return errors;
        }}>
        <Form>
          <FormRadioGroup name="choice" label="Choose one" options={options} />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );

    await fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Required")).toBeInTheDocument();
  });
});
