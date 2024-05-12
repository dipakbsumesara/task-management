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
} from '@mui/material';

// Define the type for individual field options (used in select fields)
interface IOption {
  value: string | number;
  label: string;
}

// Define the type for a single form field configuration
interface IField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
  options?: IOption[];
  validation: Record<string, any>;
}

// Define the type for the form configuration prop
type FormConfig = IField[];

// Define the props for the FormBuilder component
interface IFormBuilderProps {
  config: FormConfig;
  onSubmit: (data: FieldValues) => void;
}

// Define the props for the FormField component
interface IFormFieldProps {
  field: IField;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  errors: Record<string, any>;
}

// The FormField component responsible for rendering each field
const FormField: React.FC<IFormFieldProps> = ({
  field,
  register,
  control,
  errors,
}) => {
  const { id, name, label, type, placeholder, options, validation } = field;

  switch (type) {
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
const FormBuilder: React.FC<IFormBuilderProps> = ({ config, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {config.map((field, index) => (
        <FormField
          key={index}
          field={field}
          register={register}
          control={control}
          errors={errors}
        />
      ))}
      <button type="submit" style={{ marginTop: 20 }}>
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
