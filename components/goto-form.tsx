import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import TextField from "./text-field";

type GotoFormProps = {
  onSubmit: (value: number) => void;
};

const GotoForm = (props: GotoFormProps) => {
  const [value, setValue] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submit = () => {
    props.onSubmit(+value);
  };

  return (
    <Stack spacing="4" direction="row">
      <TextField placeholder="Go to page..." onChange={changeHandler} />
      <Button onClick={submit}>Go</Button>
    </Stack>
  );
};

export default GotoForm;
