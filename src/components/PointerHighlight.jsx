"use client";
import React from "react";
import { cn } from "../lib/utils";

export const PointerHighlight = ({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName
}) => {
  return (
    <span className={cn("relative", containerClassName)}>
      <span
        className={cn(
          "absolute -inset-x-1 -inset-y-0.5 rounded-md border border-gray-300 bg-gray-100 px-1 py-0.5",
          rectangleClassName
        )}
      />
      <svg
        className={cn(
          "absolute -left-2 -top-1 h-3 w-3 text-blue-500",
          pointerClassName
        )}
        fill="currentColor"
        viewBox="0 0 12 12"
      >
        <circle cx="6" cy="6" r="2" />
        <path d="M6 2L8 4H4L6 2Z" />
      </svg>
      {children}
    </span>
  );
};