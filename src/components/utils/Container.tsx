import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-5 pb-5">{children}</div>;
};

export default Container;
