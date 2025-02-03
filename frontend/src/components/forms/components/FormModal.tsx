//import React from 'react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-1/3">
        <button onClick={onClose} className="text-red-500 float-right">X</button>
        {children}
      </div>
    </div>
  );
};

export default FormModal;
