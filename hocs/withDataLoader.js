import { CircularProgress, Typography } from "@material-ui/core";
import { prop } from "ramda";
import styled from "styled-components";

export default function withDataLoader(
  Component,
  {
    mapQueryToProps = prop("data"),
    ProgressComponent = CircularProgress,
    ErrorComponent = Typography
  } = {}
) {
  const StyledProgress = styled(ProgressComponent)`
    max-height: 200px;
    min-height: 40px;
  `;
  const wrapped = ({ query, ...props }) => {
    const { loading, error } = query;
    if (loading) {
      return <StyledProgress />;
    } else if (error) {
      return <ErrorComponent>{error.message}</ErrorComponent>;
    } else {
      return <Component {...mapQueryToProps(query)} {...props} />;
    }
  };
  wrapped.displayName = `WithDataLoader(${Component.displayName || Component.name})`;

  return wrapped;
}
