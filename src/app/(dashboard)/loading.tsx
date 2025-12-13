import { Loader } from "lucide-react";
import React from "react";

const DashboardLoading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default DashboardLoading;
