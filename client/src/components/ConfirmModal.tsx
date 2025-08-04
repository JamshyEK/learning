import React from "react";
import ReactDOM from "react-dom";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Are you sure?",
  message = "Do you want to proceed with this action?",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-md'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          {title}
        </h2>
        <p className='text-gray-700 dark:text-gray-300 mb-6'>{message}</p>

        <div className='flex justify-end space-x-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 transition'>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 transition'>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
