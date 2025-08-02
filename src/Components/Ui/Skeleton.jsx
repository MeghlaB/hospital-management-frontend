// Create a new file at src/Components/ui/skeleton.jsx
import React from "react";

const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-md ${className}`}
      {...props}
    />
  );
};

export { Skeleton };