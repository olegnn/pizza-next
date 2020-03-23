import { detailsSelector } from "../src/selectors";
import { useSelector } from "react-redux";
import PageContainer from "../containers/PageContainer";
import { Button } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  padding: 2px;
  margin: 4px;
  & .MuiTextField-root {
    margin: 4px;
  }
`;

export default () => {
  const details = useSelector(detailsSelector);

  return (
    <PageContainer>
      <form>
        <Typography variant="h3"> Checkout </Typography>
        <StyledTextField required label="Name" name="name" />
        <StyledTextField required label="Phone" type="phone" name="phone" />
        <StyledTextField label="Email" type="email" name="email" />
        <StyledTextField
          required
          label="Address 1"
          multiline
          rowsMax={2}
          name="address1"
        />
        <StyledTextField
          required
          label="Address 2"
          multiline
          rowsMax={2}
          name="address2"
        />
        <RadioGroup
          required
          value="cash"
          label="Payment method"
          name="payment"
          onChange={() => {}}
        >
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="card" control={<Radio />} label="Card" />
        </RadioGroup>
        <StyledTextField label="Time" type="time" name="time" />
        <Button type="submit" color="primary">
          Submit order
        </Button>
      </form>
    </PageContainer>
  );
};
