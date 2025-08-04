import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FieldProps } from "formik";
import DatePicker from "react-datepicker";

interface DatePickerProps extends FieldProps {
  label: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  field,
  form,
  label,
}) => {
  const { setFieldValue } = form;
  console.log(form.touched[field.name], form.errors[field.name]);
  return (
    <div className="flex flex-col gap-1">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-left"
        htmlFor={field.name}
      >
        {label}
      </label>
      <DatePicker
        id={field.name}
        name={field.name}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(date) => {
          setFieldValue(field.name, date);
          form.setFieldTouched(field.name, true); // Mark field as touched
        }}
        // showTimeSelect
        // timeFormat="HH:mm"
        dateFormat="yyyy-MM-dd"
        data-testid={`${field.name}Input`}
        className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
      {form.errors[field.name] && (
        <>
          {console.log("inside")}
          <div className="text-red-500 text-sm mt-1 text-left">
            {form.errors[field.name] as string}
          </div>
        </>
      )}
    
    </div>
  );
};

export default CustomDatePicker;
