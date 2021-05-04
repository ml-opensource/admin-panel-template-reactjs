import { memo, ReactNode } from "react";

interface OptionalRenderProps {
  visible: boolean;
  children: ReactNode;
}

const OptionalRender = ({ visible, children }: OptionalRenderProps) => {
  return visible ? <>{children}</> : null;
};

export default memo(OptionalRender);
