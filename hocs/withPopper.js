import { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { Popper } from "@material-ui/core";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogContent,
  Slider
} from "@material-ui/core";
import {
  usePopupState,
  bindToggle,
  bindPopper
} from "material-ui-popup-state/hooks";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";

export default function withPopper(Component, PopperComponent) {
  const wrapped = props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);
    const popperRef = useRef(null);

    const handleClick = useCallback(
      (event, value) => {
        setSelected(value);
        setAnchorEl(event.currentTarget);
      },
      []
    );

    useOutsideClickHandler(popperRef, useCallback(
      (event) => {
        setSelected(null);
        setAnchorEl(null);
      },
      []
    ));

    const popperTransition = useCallback(
      ({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <DialogContent>
              <PopperComponent selected={selected} />
            </DialogContent>
          </Paper>
        </Fade>
      ),
      [selected]
    );

    const popper = selected != null && (
      <Popper ref={popperRef} open={selected != null} anchorEl={anchorEl} transition>
        {popperTransition}
      </Popper>
    );

    return (
      <>
        {popper}
        <Component
          {...props}
          onSelect={handleClick}
          selected={selected}
        />
      </>
    );
  };
  wrapped.displayName = `WithPopper(${Component.displayName || Component.name})`;

  return wrapped;
}
