import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { postApi } from '../services/axios.service';

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    toast.info('Logging in...', { toastId: '1' });

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
    <Grid container sx={{ justifyContent: 'center', px: isSmallScreen ? 2 : 0 }}>
      <Typography variant={isSmallScreen ? "h4" : "h3"} textAlign="center" sx={{ width: '100%', mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          sx={{
            my: 4,
            maxWidth: isSmallScreen ? '100%' : '600px',
            width: isSmallScreen ? '100%' : '400px',
            border: '1px solid #efefef',
            borderRadius: '6px',
            p: isSmallScreen ? 2 : 4,
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={loginPayload.email}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            placeholder="Enter your password"
            onChange={handleInputChange}
            value={loginPayload.password}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!loginPayload.email || !loginPayload.password}
            sx={{ mt: 2, py: isSmallScreen ? 1.5 : 1 }}
            {...(isSubmitting ? {
              endIcon: <CircularProgress size={18} sx={{ color: 'white' }} />,
            } : {})}
          >
            Login
          </Button>
          <Grid
            container
            sx={{ alignItems: 'center', justifyContent: 'center', mt: 2 }}
          >
            <Typography sx={{ mr: 1 }}>Don't have an account?</Typography>
            <Button
              variant="text"
              color="info"
              onClick={() => navigate('/register')}
              sx={{
                '&:hover': {
                  background: 'none',
                },
                textDecoration: 'underline',
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
