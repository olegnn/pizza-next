import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, Fade, GridList, GridListTile, GridListTileBar, IconButton, Paper, Popper, Typography } from "@material-ui/core";
import { Dialog, DialogContent, FormControlLabel, Radio, RadioGroup, Slider } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useCallback, useState } from "react";
import styled from "styled-components";

import PageContainer from "../containers/PageContainer";
import { ProductListContainerWithPopper } from "../containers/ProductListContainer";
import ToppingsListContainer from "../containers/ToppingListContainer";

export default function Pizza() {
  return (
    <PageContainer>
      <ProductListContainerWithPopper category="Pizza" />
    </PageContainer>
  );
}
