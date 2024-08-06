'use client'
import AuthLeftSide from '@/components/AuthLeftSide';
import { useUser } from '@/context/AuthContext';
import defineAbility, { getUserRedirectPath } from '@/utils/defineAbility';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import BookIcon from './BookIcon';
import Spinner from './Spinner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  role?: 'admin' | 'user' | 'owner';
}

export default function Login({ role = 'user' }: LoginProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, setToken, setAbility } = useUser()

  const { control, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // e.preventDefault()
      setIsLoading(true)
      const response = await axios.post('/api/login', data);
      if (response.status === 200) {
        const { user, token } = response.data;
        const ability = defineAbility(user);
        setAbility(ability);
        if (!user.approved) {
          setLoginMessage('Your account is pending approval. Please wait for administrator approval.');
        } else {
          const redirectPath = getUserRedirectPath(user);
          if (redirectPath) {
            router.push(redirectPath);
          } else {
            setLoginMessage('An error occurred. Please try again.');
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError('root', {
          type: 'manual',
          message: error.response.data.error || 'An error occurred during login',
        });
      } else {
        setError('root', {
          type: 'manual',
          message: 'An unexpected error occurred',
        });
      }
    } finally {
      setIsLoading(false)
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      color: "#000"
    }}>
      <AuthLeftSide />

      <Box sx={{
        flex: { xs: 'auto', md: 1 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        p: { xs: 2, sm: 4, md: 6 }
      }}>
        <Container maxWidth="sm">
          <Typography variant={isMobile ? "h5" : "h4"} component="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
            <BookIcon color="#2196f3" width={59} height={33} bgColor="#fff" />
            Book Rent
          </Typography>
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 3, textAlign: 'left' }}>
            {role === 'owner' ?
              "Login as Book Owner" :
              role === 'admin' ?
                "Login as Admin" :
                "Login into Book Rent"

            }
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            {loginMessage && (
              <Alert severity="info" sx={{ mb: 3 }}>
                {loginMessage}
              </Alert>
            )}

            {errors.root && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.root.message}
              </Alert>
            )}

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Email address"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  placeholder="john@gmail.com"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                    />
                  }
                  label="Remember me"
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#2196f3' }}
            >
              LOGIN
            </Button>
            <Typography variant="body2" align="center">
              Haven't not an account? <Link href="/signup">Sign up</Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
