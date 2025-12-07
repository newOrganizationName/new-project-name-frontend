import { AuthFormLayout, LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <AuthFormLayout
      title="Вхід"
      subtitle="Увійдіть у свій акаунт"
      footer={{
        text: 'Немає акаунта?',
        linkText: 'Зареєструватися',
        linkHref: '/sign-up',
      }}
    >
      <LoginForm />
    </AuthFormLayout>
  );
}
