import { Input } from "antd";
import _debounce from "lodash/debounce";

interface DebouncedInputProps {
  onChange?: React.ChangeEventHandler;
  value?: string | number | readonly string[];
  wait?: number;
}

const DebouncedInput = ({
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

  const persistedOnChange = (persistOnChange?: React.ChangeEventHandler) => (
    e: React.ChangeEvent
  ) => {
    // persist event as it will be resolved after debounce
    e.persist();
    persistOnChange && debouncedOnChange(e, persistOnChange);
  };

  return (
    <Input
      defaultValue={value}
      onChange={persistedOnChange(onChange)}
      {...props}
    />
  );
};

export default DebouncedInput;
