import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  isTextArea,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;
