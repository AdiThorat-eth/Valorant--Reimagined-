import React from "react";

function Button({ title, id, rightIcon, leftIcon, containerClass, onClick }) {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black flex transition-all duration-300 hover:bg-violet-500 ${containerClass}`}
      onClick={onClick}
    >
      {leftIcon}
      <span className="relative flex overflow-hidden font-General text-xs uppercase">
        <div>{title}</div>
      </span>
    </button>
  );
}

export default Button;
