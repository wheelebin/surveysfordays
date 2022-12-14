import React, { useEffect, useState, useRef } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver

const useResizeObserver = (
  elementRef: React.MutableRefObject<HTMLElement | HTMLDivElement | null>
) => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const handleElementResized = () => {
    const elementHeight = elementRef.current?.offsetHeight;
    const elementWidth = elementRef.current?.offsetWidth;

    if (elementWidth && elementWidth !== width) {
      setWidth(elementWidth);
    }
    if (elementHeight && elementHeight !== height) {
      setHeight(elementHeight);
    }
  };
  const resizeObserver = new ResizeObserver(handleElementResized);

  useEffect(() => {
    // the code in useEffect will be executed when the component
    // has mounted, so we are certain observedDiv.current will contain
    // the div we want to observe
    if (elementRef?.current) {
      resizeObserver.observe(elementRef.current);
    }

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing
    // the div
    return function cleanup() {
      resizeObserver.disconnect();
    };
  });

  return {
    height,
    width,
  };
};

export default useResizeObserver;
