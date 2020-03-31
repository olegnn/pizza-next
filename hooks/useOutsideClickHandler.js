import { useEffect } from 'react';

/**
 * Use to fire callback when occcurs click outside of ref and anchorEl.
 */
export default function useOutsideClickHandler(ref, anchorEl, cb) {
  useEffect(() => {
    function handleClickOutside(event) {
      console.log(ref, anchorEl, cb);
      if (
        ref &&
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.contains(ref.current) &&
        (!anchorEl || (!anchorEl.contains(event.target) && !event.target.contains(anchorEl)))
      ) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, anchorEl, cb]);
}
