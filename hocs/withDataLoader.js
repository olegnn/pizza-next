import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { prop } from "ramda";

export default function withDataLoader(
  Component,
  {
    mapQueryToProps = prop("data"),
    ProgressComponent = CircularProgress,
    ErrorComponent
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
      return <p>{error.message}</p>;
    } else {
      console.log(mapQueryToProps(query));
      return <Component {...mapQueryToProps(query)} {...props} />;
    }
  };
  wrapped.displayName = `withDataLoader(${Component.displayName})`;

  return wrapped;
}
