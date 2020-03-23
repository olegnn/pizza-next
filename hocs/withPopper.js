import { useState, useCallback } from "react";
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

export default function withPopper(Component) {
  const wrapped = props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setselectedId] = useState(null);

    const handleClick = useCallback(
      (event, id) => {
        setselectedId(id);
        setAnchorEl(event.currentTarget);
      },
      [setselectedId, setAnchorEl]
    );

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
      <Popper open={selectedId != null} anchorEl={anchorEl} transition>
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
