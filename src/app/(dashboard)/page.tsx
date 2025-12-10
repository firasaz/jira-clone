import { redirect } from "next/navigation";

import { getCurrent } from "@/lib/auth/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateWorkspaceForm } from "@/components/workspaces/create-workspace-form";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/login");

  return (
    <div className="m-3">
      <hr className="my-3" />
      <Input />
      <hr className="my-3" />
      <Button>Primary</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"teritary"}>Destructive</Button>
      <Button variant={"muted"}>Destructive</Button>
      <Button variant={"outline"}>Destructive</Button>
      <Button variant={"ghost"}>Destructive</Button>
      <CreateWorkspaceForm />
    </div>
  );
}
