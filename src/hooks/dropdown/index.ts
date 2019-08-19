import { useState, useRef, useEffect, RefObject, useCallback } from "react";

export default (
  exp: boolean = false
): [boolean, (flag?: boolean) => void, RefObject<HTMLElement>] => {
  const ref = useRef<HTMLElement>();
  const [expanded, setExpanded] = useState(exp);
  const toggle = (exp: boolean = !expanded) => {
    setExpanded(exp);
    if (exp) {
      document.addEventListener("click", listener);
    } else {
      document.removeEventListener("click", listener);
    }
  };

  const listener = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        toggle(false);
    },
    [ref.current]
  );

  return [expanded, toggle, ref];
};
