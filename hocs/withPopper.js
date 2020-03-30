import { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import ToppingsListContainer from "../containers/ToppingListContainer";
import ProductListContainer from "../containers/ProductListContainer";
import PageContainer from "../containers/PageContainer";
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

export default function withPopper(Component) {
  const wrapped = props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const popperRef = useRef(null);

    const handleClick = useCallback(
      (event, id) => {
        if (event.currentTarget.contains(anchorEl)) {
          setSelectedId(null);
          setAnchorEl(null);
        } else {
          setSelectedId(id);
          setAnchorEl(event.currentTarget);
        }
      },
      [anchorEl, selectedId]
    );

    const closePopper = useCallback(
      (event) => {
        setSelectedId(null);
        setAnchorEl(null);
      }
    );

    useOutsideClickHandler(popperRef, anchorEl, closePopper);

    const popperTransition = useCallback(
      ({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <DialogContent>
              <ToppingsListContainer productId={selectedId} />
            </DialogContent>
          </Paper>
        </Fade>
      ),
      [selectedId]
    );

    const toppingsPopper = selectedId != null && (
      <Popper ref={popperRef} open={selectedId != null} anchorEl={anchorEl} transition>
        {popperTransition}
      </Popper>
    );

    return (
      <>
        {toppingsPopper}
        <Component
          {...props}
          onSelectId={handleClick}
          selectedId={selectedId}
        />
      </>
    );
  };

  return wrapped;
}
