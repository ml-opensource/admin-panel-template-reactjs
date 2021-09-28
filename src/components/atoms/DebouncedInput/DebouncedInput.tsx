import { useEffect, useRef } from "react";

import { Input, InputProps } from "antd";
import _debounce from "lodash/debounce";

interface DebouncedInputProps extends InputProps {
  /** The number of milliseconds to delay the debounced event (default 500ms) */
  wait?: number;
  /** onChange passed in from FormItem */
  onChange?: React.ChangeEventHandler;
  /** Value passed in from FormItem */
  value?: string | number | readonly string[];
}

const DebouncedInput = ({
  onChange,
  value,
  wait = 500,
  ...props
}: DebouncedInputProps) => {
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    // This will allow parent to update value
    if (inputRef.current) {
      inputRef.current.setValue(value as string);
    }
  }, [value]);

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

  const persistedOnChange =
    (persistOnChange?: React.ChangeEventHandler) => (e: React.ChangeEvent) => {
      // persist event as it will be resolved after debounce
      e.persist();
      persistOnChange && debouncedOnChange(e, persistOnChange);
    };

  return (
    <Input
      defaultValue={value}
      onChange={persistedOnChange(onChange)}
      ref={inputRef}
      {...props}
    />
  );
};

export default DebouncedInput;
