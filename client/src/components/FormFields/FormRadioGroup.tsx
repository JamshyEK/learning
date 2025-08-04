import { useField } from "formik";

interface IFormRadioGroup {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}

const FormRadioGroup: React.FC<IFormRadioGroup> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className='mb-4'>
      <p className='block text-gray-700 text-sm font-bold mb-2 text-left'>
        {label}
      </p>
      <div className='flex flex-wrap gap-4'>
        {options.map((option) => (
          <label key={option.value} className='inline-flex items-center'>
            <input
              type='radio'
              {...field}
              value={option.value}
              checked={field.value === option.value}
              className='form-radio text-blue-600'
            />
            <span className='ml-2 text-gray-700 text-sm'>{option.label}</span>
          </label>
        ))}
      </div>
      {meta.touched && meta.error && (
        <div className='text-red-500 text-sm mt-1'>{meta.error}</div>
      )}
    </div>
  );
};

export default FormRadioGroup;
