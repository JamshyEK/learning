import { ErrorMessage, useField, useFormikContext } from "formik";

interface IFormFileInput {
  name: string;
  labelName: string;
  accept?: string;
  maxSizeInMB?: number;
}

const FormFileInput: React.FC<IFormFileInput> = ({
  name,
  labelName,
  accept = "image/*,application/pdf",
  maxSizeInMB = 2,
}) => {
  const [, meta, helpers] = useField(name);
  const { setFieldValue, setFieldError } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const isValidType = accept
      .split(",")
      .some((type) =>
        type === "image/*" ? file.type.startsWith("image/") : file.type === type
      );

    if (!isValidType) {
      setFieldError(name, `Only image or PDF files are allowed`);
      setFieldValue(name, null);
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      setFieldError(name, `File size must be less than ${maxSizeInMB} MB`);
      setFieldValue(name, null);
      return;
    }

    setFieldValue(name, file);
  };

  return (
    <div className='mb-4'>
      <label
        htmlFor={name}
        className='block text-gray-700 text-sm font-bold mb-2 text-left'>
        {labelName}
      </label>
      <input
        id={name}
        name={name}
        type='file'
        accept={accept}
        onChange={handleChange}
        className='block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
      />
      <ErrorMessage
        name={name}
        component='div'
        className='text-red-500 text-sm mt-1 text-left'
      />
    </div>
  );
};

export default FormFileInput;
