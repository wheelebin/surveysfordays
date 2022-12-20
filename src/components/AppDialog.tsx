import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AppButton from "./AppButton";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode[] | React.ReactNode;
  full?: boolean;
  open: boolean;
  onOpen: (isOpen: boolean) => void;
};

const DialogComponent = ({ trigger, children, full, open, onOpen }: Props) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={() => onOpen(true)}>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-red fixed top-0 left-0 right-0 bottom-0 grid place-items-center overflow-y-scroll">
          <Dialog.Content
            className={`bg-white p-3 ${full ? "w-full h-full" : "shadow"}`}
          >
            <div>
              <div className="w-full flex justify-end">
                <AppButton onClick={() => onOpen(false)}>Close</AppButton>
              </div>
              {children}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogComponent;
