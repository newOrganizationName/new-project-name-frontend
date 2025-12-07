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
import { useSignup } from '../model/useSignup';
import { validateEmail, validatePassword } from '../lib/validation';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm() {
  const router = useRouter();
  const { mutate: signup, isPending } = useSignup();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
  });

  const password = watch('password');

  const onSubmit = (data: SignUpFormData) => {
    setServerError(null);

    signup(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error: Error) => {
          setServerError(error.message || 'Помилка при реєстрації');
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
              placeholder="Мінімум 8 символів"
              {...register('password', {
                required: "Пароль обов'язковий",
                validate: (value) =>
                  validatePassword(value) ||
                  'Пароль має містити 8+ символів, велику та малу літеру, цифру та спецсимвол',
              })}
            />
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.confirmPassword}>
            <FormLabel>Підтвердіть пароль</FormLabel>
            <Input
              type="password"
              placeholder="Повторіть пароль"
              {...register('confirmPassword', {
                required: "Підтвердження пароля обов'язкове",
                validate: (value) =>
                  value === password || 'Паролі не співпадають',
              })}
            />
            {errors.confirmPassword && (
              <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" loading={isPending} fullWidth sx={{ mt: 2 }}>
            Зареєструватися
          </Button>
        </Stack>
      </form>
    </>
  );
}
