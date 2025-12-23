"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTaskModal } from "@/hooks/tasks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {/* <CreateProjectForm onCancel={close} /> */}
      {taskId && <EditTaskFormWrapper taskId={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
