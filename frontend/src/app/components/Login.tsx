import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { postApi } from '../services/axios.service';
import FormBuilder from '../helpers/FormBuilder';
import { FormConfig } from 'index';
import { LOCAL_STORAGE_KEYS } from '../helpers/constants';

interface LoginPayload {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Define the configuration for the form
  const formConfig: FormConfig = useMemo(
    () => [
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        inputType: 'text',
        fielType: 'text',
        placeholder: 'Enter your email',
        validation: { required: 'Email id is required field' },
      },
      {
        id: 'password',
        name: 'password',
        label: 'Password',
        inputType: 'text',
        fieldType: 'password',
        placeholder: 'Enter your password',
        validation: { required: 'Password is required' },
      },
    ],
    []
  );

  const handleSubmit = async (payload: LoginPayload) => {
    try {
      const response = await postApi('/auth/login', payload);
      if (response.data?.access_token) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
          response.data.access_token
        );
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Grid
      container
      sx={{ justifyContent: 'center', px: isSmallScreen ? 2 : 0 }}
    >
      <Typography
        variant={isSmallScreen ? 'h4' : 'h3'}
        textAlign="center"
        sx={{ width: '100%', mb: 2 }}
      >
        Login
      </Typography>
      <Grid
        container
        sx={{
          my: 4,
          maxWidth: isSmallScreen ? '100%' : '600px',
          width: isSmallScreen ? '100%' : '500px',
          border: '1px solid #efefef',
          borderRadius: '6px',
          px: isSmallScreen ? 2 : 3,
          py: isSmallScreen ? 1 : 2,
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <FormBuilder
          config={formConfig}
          onSubmit={handleSubmit}
          submitButtonProps={{
            label: 'Login',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Login;
