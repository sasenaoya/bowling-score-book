import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type AutoCompleteProps = {
  name: string;
  values: string[];
  label: string;
}

export default function Autocomplete(props: AutoCompleteProps) {
  const { name, values, label } = props;
  const { control } = useFormContext();

  return (
    <Controller name={name} control={control} render={
      ({ field }) => (
        <MUIAutocomplete
          freeSolo
          options={values.map((value) => value)}
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              label={label}
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: 'search',
                },
              }}
            />
          )}
        />
      )
    }/>
  );
}