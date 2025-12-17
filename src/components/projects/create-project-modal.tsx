"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateWorkspaceForm } from "@/components/workspaces/create-workspace-form";
import { useCreateWorkspaceModal } from "@/hooks/workspaces/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};
