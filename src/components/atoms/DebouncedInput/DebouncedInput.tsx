import _debounce from "lodash/debounce";

interface DebouncedInputProps {
  renderInput: (props: {
    onChange?: React.ChangeEventHandler;
    defaultValue?: string | number | readonly string[];
  }) => React.ReactNode;
  onChange?: React.ChangeEventHandler;
  value?: string | number | readonly string[];
  wait?: number;
}

const DebouncedInput = ({
  renderInput,
  onChange,
  value,
  wait = 500,
  ...props
}: DebouncedInputProps) => {
  // Debounce the changes to the value
  const debouncedOnChange = _debounce(
    (
      debounceEvent: React.ChangeEvent,
      debounceOnChange: React.ChangeEventHandler
    ) => {
      debounceOnChange(debounceEvent);
    },
    wait
  );

  const persistedOnChange = (persistOnChange: React.ChangeEventHandler) => (
    e: React.ChangeEvent
  ) => {
    // persist event as it will be resolved after debounce
    e.persist();
    debouncedOnChange(e, persistOnChange);
  };

  return (
    <>
      {(!!onChange &&
        renderInput?.({
          ...props,
          defaultValue: value,
          onChange: persistedOnChange(onChange),
        })) ??
        null}
    </>
  );
};

export default DebouncedInput;
