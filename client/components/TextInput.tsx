import React from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface ITextInput {
  label: string;
  name: string;
  type?: string;
}

const TextInput: React.FC<ITextInput> = ({ label, name, type = "text" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-2">
      <label htmlFor={name} className="block text-gray-700 text-lg mb-2">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={twMerge(
          `appearance-none border border-ct-dark-200 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
          `${errors[name] && "border-red-500"}`
        )}
      />
      <p
        className={twMerge(
          `text-red-500 text-xs italic mb-2 invisible`,
          `${errors[name] && "visible"}`
        )}
      >
        {errors[name]?.message as string}
      </p>
    </div>
  );
};

export default TextInput;
