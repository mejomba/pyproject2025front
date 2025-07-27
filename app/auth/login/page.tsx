'use client'

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
} from '@mui/material';

const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('otp');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // پیاده‌سازی منطق ارسال فرم
  };

  return (
      <Container maxWidth="sm">
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
        >
          <Typography variant="h5" component="h1" align="center">
            ورود / ثبت‌نام
          </Typography>

          <TextField
              id="phone"
              label="شماره موبایل"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="موبایل یا ایمیل"
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">روش ورود:</FormLabel>
            <RadioGroup
                row
                name="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
            >
              <FormControlLabel
                  value="otp"
                  control={<Radio />}
                  label="رمز یکبار مصرف"
              />
              <FormControlLabel
                  value="password"
                  control={<Radio />}
                  label="رمز عبور"
              />
            </RadioGroup>
          </FormControl>

          {error && <Alert severity="error">{error}</Alert>}

          <Button type="submit" variant="contained" color="primary">
            ادامه
          </Button>
        </Box>
      </Container>
  );
};

export default LoginForm;
