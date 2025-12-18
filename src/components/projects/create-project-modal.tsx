"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { useCreateProjectModal } from "@/hooks/projects/use-create-project-modal";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
