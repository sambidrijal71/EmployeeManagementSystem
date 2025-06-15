import { TextField, TextFieldProps } from '@mui/material';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules: RegisterOptions<T, Path<T>>;
  textFieldProps?: TextFieldProps;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  textFieldProps,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          id={name}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          {...textFieldProps}
        />
      )}
    />
  );
};
export default FormInput;
