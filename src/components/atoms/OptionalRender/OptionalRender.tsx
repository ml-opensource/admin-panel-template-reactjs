import React from "react";

const OptionalRender = (WrappedComponent: React.ElementType) => {
  const component = (props: any) => {
    return props.visible ? <WrappedComponent {...props} /> : null;
  };
  return component;
};

export default OptionalRender;
