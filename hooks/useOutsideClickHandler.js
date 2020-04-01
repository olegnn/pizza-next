import { useEffect } from "react";

/**
 * Use to fire callback when click occurs outside of ref
 */
export default function useOutsideClickHandler(ref, cb) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.contains(ref.current)
      ) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
