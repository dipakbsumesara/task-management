import React from 'react';
import {
  useForm,
  Controller,
  UseFormRegister,
  FieldValues,
  Control,
} from 'react-hook-form';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Button,
} from '@mui/material';
import { IFormBuilderProps, IFormFieldProps } from 'index';

// The FormField component responsible for rendering each field
const FormField: React.FC<IFormFieldProps> = ({
  field,
  register,
  control,
  errors,
}) => {
  const {
    id,
    name,
    label,
    inputType,
    fieldType,
    placeholder,
    options,
    validation,
  } = field;

  switch (inputType) {
    case 'text':
      return (
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id={id}
          label={label}
          placeholder={placeholder}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          type={fieldType || "text"}
          {...register(name, validation)}
        />
      );

    case 'select':
      return (
        <FormControl fullWidth margin="normal" error={!!errors[name]}>
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field }) => (
              <Select labelId={`${id}-label`} label={label} {...field}>
                {options?.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors[name] && (
            <FormHelperText>{errors[name]?.message}</FormHelperText>
          )}
        </FormControl>
      );

    default:
      return null;
  }
};

// The main FormBuilder component
const FormBuilder: React.FC<IFormBuilderProps> = ({
  config,
  onSubmit,
  submitButtonProps,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      {config.map((field, index) => (
        <FormField
          key={index}
          field={field}
          register={register}
          control={control}
          errors={errors}
        />
      ))}
      <Button
        variant={submitButtonProps?.variant || 'contained'}
        type={submitButtonProps?.type || 'submit'}
        color={submitButtonProps?.color || 'primary'}
        sx={{ mt: 2 }}
      >
        {submitButtonProps?.label || 'Submit'}
      </Button>
    </form>
  );
};

export default FormBuilder;
