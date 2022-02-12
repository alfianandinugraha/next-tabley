import { Input, InputProps } from "@chakra-ui/input";
import { useEffect, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

type TextFieldProps = InputProps & {
  onChangeDebounce?: (value: string) => void;
};

const TextField = (props: TextFieldProps) => {
  const debounced = useDebouncedCallback<(value: string) => void>(
    (value) => props.onChangeDebounce && props.onChangeDebounce(value),
    500
  );

  const newProps = { ...props };
  delete newProps.onChangeDebounce;

  return <Input onChange={(e) => debounced(e.target.value)} {...props} />;
};

export default TextField;
