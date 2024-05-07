import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { postApi } from '../services/axios.service';

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setLoginPayload((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast.info('logging in...', { toastId: '1' });

    try {
      const response = await postApi('/auth/login', loginPayload);
      setIsSubmitting(false);
      localStorage.setItem('access-token', response.data.data.access_token);
      navigate('/');
    } catch (error: any) {
      setIsSubmitting(false);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message, { updateId: '1' });
        return;
      }
      throw error;
    }
  };

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Typography variant="h3" textAlign="center" width="100%">
        Login
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
        <Grid
          container
          sx={{
            my: 4,
            width: '600px',
            border: '1px solid #efefef',
            borderRadius: '6px',
            p: 4,
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            id="email"
            placeholder="email"
            onChange={(e) => handleInputChange(e)}
          ></TextField>
          <TextField
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => handleInputChange(e)}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!loginPayload.email || !loginPayload.password}
            {...(isSubmitting
              ? {
                  endIcon: (
                    <CircularProgress size={18} sx={{ color: 'white' }} />
                  ),
                }
              : {})}
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
