'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/joy';
import { useLogin } from '../model/useLogin';
import { validateEmail } from '../lib/validation';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    setServerError(null);

    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error: Error) => {
          setServerError(error.message || 'Невірний email або пароль');
        },
      },
    );
  };

  return (
    <>
      {serverError && (
        <Alert color="danger" variant="soft">
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl error={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="your@email.com"
              {...register('email', {
                required: "Email обов'язковий",
                validate: (value) =>
                  validateEmail(value) || 'Невірний формат email',
              })}
            />
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.password}>
            <FormLabel>Пароль</FormLabel>
            <Input
              type="password"
              placeholder="Введіть пароль"
              {...register('password', {
                required: "Пароль обов'язковий",
              })}
            />
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" loading={isPending} fullWidth sx={{ mt: 2 }}>
            Увійти
          </Button>
        </Stack>
      </form>
    </>
  );
}
