import { MouseEventHandler, MutableRefObject } from "react";

export const handleClickOutside = (
  event: MouseEvent,
  ref: MutableRefObject<null>,
  onClick: any
) => {
  if (ref.current && !(ref.current! as any).contains(event.target)) {
    onClick();
  }
};
