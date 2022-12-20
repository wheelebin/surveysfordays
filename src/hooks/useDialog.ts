import { useState } from "react";
const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOnOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return {
    open,
    openDialog: () => setOpen(true),
    closeDialog: () => setOpen(false),
    handleOnOpenChange,
  };
};

export default useDialog;
