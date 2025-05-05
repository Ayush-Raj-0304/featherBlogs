import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-sm font-medium text-zinc-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`px-4 py-2.5 rounded-xl bg-white/80 text-zinc-800 placeholder:text-zinc-500 outline-none transition-all duration-200 border border-white/40 shadow-inner focus:ring-2 focus:ring-indigo-300 focus:bg-white/90 w-full backdrop-blur-md ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
