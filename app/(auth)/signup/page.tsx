"use client";

import { zodResolver } from "@hookform/resolvers/zod";

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
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import BookIcon from "../components/BookIcon";

// Zod schema (same as before)
const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    location: z.string().min(1, "Location is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      phone: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post("/api/register", {
        email: data.email,
        password: data.password,
        location: data.location,
        phone: data.phone,
      });

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("root", {
          type: "manual",
          message:
            error.response.data.error ||
            "An error occurred during registration",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        color: "#000"
      }}
    >
      {/* Logo section - hidden on mobile */}
      <Box
        sx={{
          flex: { xs: "none", md: 1 },
          bgcolor: "#171B36",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BookIcon />
      </Box>

      {/* Form section */}
      <Box
        sx={{
          flex: { xs: "auto", md: 1 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <BookIcon color="#2196f3" width={59} height={33} bgColor="#fff" />
            Book Rent
          </Typography>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{ mb: 3, textAlign: "left" }}
          >
            Signup into Book Rent
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
          >
            {errors.root && (
              <Alert severity="error" sx={{ mb: 2 }}>
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
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Location"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  placeholder="Addis Ababa"
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  placeholder="0911555555"
                />
              )}
            />
            <Controller
              name="termsAccepted"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="I accept the Terms and Conditions"
                />
              )}
            />
            {errors.termsAccepted && (
              <Typography
                color="error"
                variant="caption"
                display="block"
                sx={{ mt: 1 }}
              >
                {errors.termsAccepted.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#2196f3" }}
            >
              SIGN UP
            </Button>
            <Typography variant="body2" align="center">
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
