import { Types } from 'mongoose';

export type ITaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface ITask {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  status: ITaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface ICustomBreadcrump {
  label: string;
  href?: string;
  color?: string;
}

// Define the type for individual field options (used in select fields)
export interface IOption {
  value: string | number;
  label: string;
}

// Define the type for a single form field configuration
export interface IField {
  id: string;
  name: string;
  label: string;
  inputType: 'text' | 'select';
  fieldType?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  options?: IOption[];
  validation: Record<string, any>;
}

// Define the type for the form configuration prop
export type FormConfig = IField[];

// Define the props for the FormBuilder component
export interface IFormBuilderProps {
  config: FormConfig;
  onSubmit: (data: FieldValues) => void;
  submitButtonProps?: {
    type?: 'button' | 'reset' | 'submit' | undefined;
    variant?: 'contained' | 'text' | 'outlined';
    color?:
      | 'inherit'
      | 'error'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning';
    label?: string;
  };
}

// Define the props for the FormField component
export interface IFormFieldProps {
  field: IField;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  errors: Record<string, any>;
}
