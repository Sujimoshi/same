import { useState, useRef, RefObject, useCallback } from "react";

export default (
  exp: boolean = false
): [boolean, (flag?: boolean) => void, RefObject<HTMLElement>] => {
  const ref = useRef<HTMLElement>();
  const [expanded, setExpanded] = useState(exp);

  const listener = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
        document.removeEventListener("click", listener);
      }
    },
    [setExpanded, ref]
  );

  const toggle = useCallback(
    (exp: boolean = !expanded) => {
      setExpanded(exp);
      if (exp) {
        document.addEventListener("click", listener);
      } else {
        document.removeEventListener("click", listener);
      }
    },
    [expanded, listener]
  );

  return [expanded, toggle, ref];
};
