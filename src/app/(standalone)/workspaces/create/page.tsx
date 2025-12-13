import { redirect } from "next/navigation";

import { getCurrent } from "@/lib/auth/actions";

import { CreateWorkspaceForm } from "@/components/workspaces/create-workspace-form";

const CreateWorkspacePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/login");
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export default CreateWorkspacePage;
