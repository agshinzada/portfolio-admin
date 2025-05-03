import React from "react";

const SkillGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {children}
    </div>
  );
};

export default SkillGrid;
