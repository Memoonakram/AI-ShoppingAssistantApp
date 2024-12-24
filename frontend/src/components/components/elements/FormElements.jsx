import React from "react";

export const InputElement = ({
  label,
  disabled,
  placeholder,
  name,
  type = "text",
  step,
  value,
  handleChange,
  iconclassName,
  svg,
  required,
}) => {
  return (
    <label className="block">
      <span>{label} {required && <span className="text-red-500">*</span>}</span>
      <span className="relative mt-1.5 flex">
        <input
          className="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
          placeholder={placeholder ? placeholder : `Enter ${label}`}
          name={name}
          value={value}
          onChange={handleChange}
          type={type}
          {...(disabled ? { disabled: true } : {})}
          // step for number input
          {...(type === "number" ? { step: step } : {})}
        />
        <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
          <i className={iconclassName}></i>
          {svg}
        </span>
      </span>
    </label>
  );
};

export const SelectElement = ({
  label,
  disabled,
  name,
  value,
  handleChange,
  options,
  iconclassName,
}) => {
  return (
    <label className="block">
      <span>{label}</span>
      <span className="relative mt-1.5 flex">
        <select
          className="form-select w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
          name={name}
          value={value}
          onChange={handleChange}
          {...(disabled ? { disabled: true } : {})}
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
          <i className={iconclassName}></i>
        </span>
      </span>
    </label>
  );
};

export const CheckboxElement = ({
  label,
  disabled,
  name,
  checked,
  handleChange,
  lineClamp,
}) => {
  return (
    <label className={`inline-flex space-x-2 ${lineClamp ? 'items-center' : ''}`}>
      <input
        className="form-checkbox is-basic h-4 w-4 rounded border-slate-400/70 checked:border-green-900 checked:bg-green-700 hover:border-green-700 focus:border-green-900 dark:border-navy-400 dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent dark:focus:border-accent"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        {...(disabled ? { disabled: true } : {})}
      />
      <span className={lineClamp ? "line-clamp-1" : ""}>{label}</span>
    </label>
  );
};

export const ButtonElement = ({ label, disabled, type, onClick, primary, iconclassName, customClass, rightIcon }) => {
  return (
    <button
      {...(type ? { type: type } : {})}
      {...(disabled ? { disabled: true } : {})}
      onClick={onClick}
      className= {`btn space-x-2 font-medium ${customClass}
      ${primary ? " bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
      : " bg-slate-150 text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"}
      `}
    >
      {iconclassName && !rightIcon && <i className={iconclassName + ' mr-2 '}></i>}
      {label}
      {iconclassName && rightIcon && <i className={iconclassName + ' ml-2'}></i>}
    </button>
  );
};
