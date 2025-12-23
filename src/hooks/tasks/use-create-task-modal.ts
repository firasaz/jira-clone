import { useQueryState, parseAsBoolean, parseAsStringEnum } from "nuqs";

import { TaskStatus } from "@/lib/tasks/types";

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [status, setStatus] = useQueryState<TaskStatus>(
    "task-status",
    parseAsStringEnum<TaskStatus>(Object.values(TaskStatus)).withOptions({
      clearOnDefault: true,
    })
  );

  const open = (initialStatus?: TaskStatus) => {
    setIsOpen(true);
    if (initialStatus) setStatus(initialStatus);
    else setStatus(null);
  };

  const close = () => {
    setIsOpen(false);
    setStatus(null);
  };

  return {
    isOpen,
    open,
    close,
    setIsOpen,

    status,
    setStatus,
  };
};
