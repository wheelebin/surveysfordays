import React, { useState, useRef, useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useToastStore } from "../stores/toast";

type AppToastProps = {
  title: string;
  description: string;

  open: boolean;
  children?: React.ReactNode | React.ReactNode[];
};

const AppToast = ({ title, description, open }: AppToastProps) => {
  const [openInternal, setOpenInternal] = useState<boolean>(false);

  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    setOpenInternal(open);
    open ? handleOnOpen() : handleOnClose();
  }, [open]);

  const handleOnOpen = () => {
    setOpenInternal(false);

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpenInternal(true);
    }, 100);
  };

  const handleOnClose = () => {
    useToastStore.getState().clear();
  };

  const handleOnOpenChange = (openState: boolean) => {
    if (openState) {
      handleOnOpen();
    } else {
      handleOnClose();
    }
  };

  return (
    <Toast.Provider>
      <Toast.Root
        open={openInternal}
        onOpenChange={handleOnOpenChange}
        className="flex hadow p-2  animate-slide data-[state=open]:animate-slide bg-green-200/60 border border-green-200 "
      >
        <div className="w-full p-2">
          <Toast.Title className="pb-2 text-md font-semibold text-gray-800">
            {title}
          </Toast.Title>
          <Toast.Description className="text-sm text-gray-600">
            {description}
          </Toast.Description>
        </div>
        <Toast.Action altText="Close toast" onClick={handleOnClose}>
          <Cross2Icon />
        </Toast.Action>
        <Toast.Close />
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-7 gap-2.5 w-96 z-10" />
    </Toast.Provider>
  );
};

export default AppToast;
