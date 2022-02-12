import "regenerator-runtime/runtime";
import { Input, InputProps } from "@chakra-ui/input";
import { useAsyncDebounce } from "react-table";

type TextFieldProps = InputProps & {
  onChangeDebounce?: (value: string) => void;
};

const TextField = (props: TextFieldProps) => {
  const debounced = useAsyncDebounce(
    (value) => props.onChangeDebounce && props.onChangeDebounce(value),
    500
  );

  const newProps = { ...props };
  delete newProps.onChangeDebounce;

  return <Input onChange={(e) => debounced(e.target.value)} {...props} />;
};

export default TextField;
