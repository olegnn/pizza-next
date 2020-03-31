import { Component } from "react";

/**
 * Special component which logs different between nextProps and current props.
 * For development purposes only.
 */
export default function withPropsChecker(WrappedComponent) {
  if (process.env.NODE_ENV !== "development") return WrappedComponent;
  else
    return class PropsChecker extends Component {
      componentWillReceiveProps(nextProps) {
        Object.keys(nextProps)
          .filter(key => {
            return nextProps[key] !== this.props[key];
          })
          .map(key => {
            console.log(
              "changed property:",
              key,
              "from",
              this.props[key],
              "to",
              nextProps[key]
            );
          });
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
}
