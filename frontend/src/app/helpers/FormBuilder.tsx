import React, { useEffect } from 'react';
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
const FormField: React.FC<IFormFieldProps> = ({ field, control, errors }) => {
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
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id={id}
              label={label}
              placeholder={placeholder}
              type={fieldType || 'text'}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              inputRef={ref}
            />
          )}
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                labelId={`${id}-label`}
                label={label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              >
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
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ values: defaultValues });

  // Effect to reset the form with default values when they change
  useEffect(() => {
    if (defaultValues) {
      for (const key in defaultValues) {
        const value = defaultValues[key];
        setValue(key, value);
      }
    }
  }, [setValue, defaultValues]);

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
