import { useField } from "formik";

interface IFormCheckbox {
  name: string;
  options: { label: string; value: string }[];
  multiple?: boolean;
}

const FormCheckbox: React.FC<IFormCheckbox> = ({
  name,
  options,
  multiple = false,
}) => {
  const [field, meta, helpers] = useField<any>(name);

  const handleChange = (optionValue: string) => {
    if (multiple) {
      const currentValues = field.value || [];
      const isSelected = currentValues.includes(optionValue);
      const updatedValues = isSelected
        ? currentValues.filter((val: string) => val !== optionValue)
        : [...currentValues, optionValue];
      helpers.setValue(updatedValues);
    } else {
      // toggle single value: if already selected, unselect it
      if (field.value === optionValue) {
        helpers.setValue(""); // unselect
      } else {
        helpers.setValue(optionValue);
      }
    }
  };

  const isChecked = (optionValue: string) =>
    multiple ? field.value?.includes(optionValue) : field.value === optionValue;

  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {multiple ? "Select multiple options" : "Select one option"}
      </label>
      <div className='space-y-2'>
        {options.map((option) => (
          <label
            key={option.value}
            className='inline-flex items-center text-sm text-gray-700'>
            <input
              type='checkbox'
              name={name}
              value={option.value}
              checked={isChecked(option.value)}
              onChange={() => handleChange(option.value)}
              className='form-checkbox text-blue-600'
            />
            <span className='ml-2'>{option.label}</span>
          </label>
        ))}
      </div>
      {meta.touched && meta.error && (
        <div className='text-red-500 text-sm mt-1'>{meta.error as string}</div>
      )}
    </div>
  );
};

export default FormCheckbox;
