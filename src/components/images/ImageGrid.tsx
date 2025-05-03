import React from "react";

const ImageGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
      {children}
    </div>
  );
};

export default ImageGrid;
