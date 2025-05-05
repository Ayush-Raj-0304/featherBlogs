import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2.5 rounded-xl font-medium shadow-md transition-all duration-200 hover:brightness-105 active:scale-95 backdrop-blur-md ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
