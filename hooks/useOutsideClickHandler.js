import { useEffect } from 'react';

export default function useOutsideClickHandler(ref, anchorEl, cb) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref && ref.current && !ref.current.contains(event.target) && anchorEl && !anchorEl.contains(event.target)) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, anchorEl, cb]);
}
