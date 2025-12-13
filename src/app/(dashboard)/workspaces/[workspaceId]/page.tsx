import { redirect } from "next/navigation";

import { getCurrent } from "@/lib/auth/actions";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/login");

  return <div>WorkspaceidPage</div>;
};
export default WorkspaceIdPage;
