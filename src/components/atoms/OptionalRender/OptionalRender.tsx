interface OptionalRenderProps {
  visible: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const OptionalRender = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P & OptionalRenderProps> => ({
  visible,
  ...props
}: OptionalRenderProps) =>
  visible ? <WrappedComponent {...(props as P)} /> : null;

export default OptionalRender;
